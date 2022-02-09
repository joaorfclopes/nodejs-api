import express from 'express'
import jwt from 'jsonwebtoken'

export const Router = express.Router

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.slice(7, authorization.length)
    jwt.verify(token, 'somethingsecret', (err, decode) => {
      if (err) {
        res
          .status(401)
          .send({ message: 'invalid token, please login with a valid user...' })
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    res.status(401).send({ message: 'no token, please login' })
  }
}
