import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'

export const Router = express.Router

export const hashSync = password => {
  return bcrypt.hashSync(password, 8)
}

export const generateToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username
    },
    process.env.JWT_SECRET || 'somethingsecret',
    { expiresIn: '30d' }
  )
}
