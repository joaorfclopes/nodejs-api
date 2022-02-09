import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './api/routes/authRoutes.js'
import userRoutes from './api/routes/userRoutes.js'

const app = express()
const port = 8080

mongoose.connect('mongodb://localhost/nodejs-api', {
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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}! 🚀`)
})
