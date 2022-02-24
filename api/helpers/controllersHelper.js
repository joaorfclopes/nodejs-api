import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { jwtSecret } from '../../globals.js'
import Token from '../models/tokenModel.js'

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
  const token = await Token.findOne({ user: user._id, expired: false })
  const tokenValue = token && token.value
  const headerAuth = req.headers.authorization.replace('Bearer ', '')

  if (tokenValue === headerAuth) {
    callback()
  } else {
    res.status(401).send({ message: 'your token has expired, please login...' })
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

export const objectId = id => {
  const isValid = mongoose.isValidObjectId(id)

  return isValid ? id : null
}
