import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'
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
    { expiresIn: '10h' }
  )
}

export const validateToken = async (req, res, user, callback) => {
  const token = await Token.findOne({ user: user._id, expired: false })
  const tokenValue = token.value
  const headerAuth = req.headers.authorization.replace('Bearer ', '')

  if (tokenValue === headerAuth) {
    callback()
  } else {
    res
      .status(401)
      .send({ message: 'you do not have permissions to do this...' })
  }
}

export const activeToken = async user => {
  const token = await Token.findOne({ user: user._id, expired: false })

  return token ? true : false
}
