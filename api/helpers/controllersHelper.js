import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
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
    'somethingsecret',
    { expiresIn: '60s' }
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

export const activeToken = async user => {
  const token = await Token.findOne({ user: user._id, expired: false })

  return !!token
}

export const objectId = id => {
  const isValid = mongoose.isValidObjectId(id)

  return isValid ? id : null
}
