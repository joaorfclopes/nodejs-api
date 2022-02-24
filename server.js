import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './api/routes/authRoutes.js'
import userRoutes from './api/routes/userRoutes.js'
import { appPort, mongoUri } from './globals.js'

const app = express()

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRoutes)
app.use('/users', userRoutes)

app.use((err, req, res) => {
  res.status(500).send({ message: err.message })
})

app.listen(appPort, () => {
  console.log(`Server is listening on port ${appPort}! 🚀`)
})
