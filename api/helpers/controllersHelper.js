import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../../globals.js'
import Token from '../models/tokenModel.js'
import User from '../models/userModel.js'
import { formatAuth, objectId, Role } from './general.js'

export const Router = express.Router
export const compareSync = bcrypt.compareSync
export const hashSync = bcrypt.hashSync

export const generateToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username
    },
    jwtSecret,
    { expiresIn: '10h' }
  )
}

export const isAdminLoggedIn = async req => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return false
  }

  const token = formatAuth(authorization)
  const validToken = await Token.findOne({ value: token, expired: false })
  const userId = validToken && validToken.user
  const user = await User.findById(objectId(userId))

  return user && user.role === Role.ADMIN
}

export const createToken = async user => {
  const token = new Token({
    user: user._id,
    value: generateToken(user),
    expired: false
  })
  const createdToken = await token.save()
  return createdToken
}

export const validateToken = async (req, res, user, callback) => {
  const isAdmin = await isAdminLoggedIn(req, res)

  if (isAdmin) {
    return callback()
  }

  const token = await Token.findOne({ user: user._id, expired: false })
  const tokenValue = token && token.value
  const headerAuth = formatAuth(req.headers.authorization)

  if (tokenValue === headerAuth) {
    return callback()
  } else {
    res
      .status(401)
      .send({ message: 'you do not have permissions to do this...' })
  }
}

export const isExpired = date => {
  const dateNow = new Date()
  const difference = Math.abs(dateNow - date)
  const passedHours = (difference / (1000 * 60 * 60)).toFixed(1)

  return passedHours >= 10
}

export const activeToken = async user => {
  const token = await Token.findOne({ user: user._id, expired: false })
  const createdAt = token && token.createdAt

  if (token) {
    if (isExpired(createdAt)) {
      token.expired = true
      await token.save()

      return false
    } else {
      return true
    }
  }

  return !!token
}
