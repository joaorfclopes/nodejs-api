import { generateToken, hashSync } from '../helpers/controllersHelper.js'
import User from '../models/userModel.js'

export const createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: hashSync(req.body.password)
  })
  try {
    const existentUser = await User.findOne({ username: user.username })
    if (!existentUser) {
      const createdUser = await user.save()
      res.send({
        message: 'user created successfully!',
        user: {
          _id: createdUser._id,
          username: createdUser.username,
          token: generateToken(createdUser)
        }
      })
    } else {
      res.status(404).send({ message: 'user already exists...' })
    }
  } catch (error) {
    res.status(500).send({ message: 'error creating user', error })
  }
}

export const findOne = async (req, res) => {
  const user = await User.findOne({ username: req.params.user })
  try {
    if (user) {
      res.send({ user })
    } else {
      res.status(404).send({ message: 'user not found...' })
    }
  } catch (error) {
    res.status(500).send({ message: 'error finding user', error })
  }
}

export const findAll = async (req, res) => {
  const users = await User.find({})
  try {
    if (users.length > 0) {
      res.send({ users })
    } else {
      res
        .status(404)
        .send({ message: 'there are no users in the database yet...' })
    }
  } catch (error) {
    res.status(500).send({ message: 'error finding users', error })
  }
}

export const updateUser = async (req, res) => {
  const user = await User.findOne({ username: req.params.user })
  try {
    const { username, password } = req.body
    if (user) {
      if (username) user.username = username
      if (password) user.password = hashSync(password)
      const updatedUser = await user.save()
      res.send({ message: 'user updated successfully!', user: updatedUser })
    } else {
      res.status(404).send({ message: 'user not found...' })
    }
  } catch (error) {
    res.status(500).send({ message: 'error updating user', error })
  }
}

export const deleteUser = async (req, res) => {
  const user = await User.findOne({ username: req.params.user })
  try {
    if (user) {
      const deleteUser = await user.remove()
      res.send({ message: 'user deleted successfully!', user: deleteUser })
    } else {
      res.status(404).send({ message: 'user does not exist...' })
    }
  } catch (error) {
    res.status(500).send({ message: 'error deleting user', error })
  }
}
