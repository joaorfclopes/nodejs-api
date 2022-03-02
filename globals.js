import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`
  })
}

const appPort = process.env.PORT || 5000
const mongoUri = process.env.MONGODB_URI
const jwtSecret = process.env.JWT_SECRET

export { appPort, mongoUri, jwtSecret }
