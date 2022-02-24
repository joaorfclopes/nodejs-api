import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`
  })
}

const appPort = process.env.APP_PORT
const mongoUri = process.env.MONGODB_URI

export { appPort, mongoUri }
