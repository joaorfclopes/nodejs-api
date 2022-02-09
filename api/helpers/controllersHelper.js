import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'

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
