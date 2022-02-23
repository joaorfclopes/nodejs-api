import {
  createToken,
  hashSync,
  objectId,
  validateToken
} from '../helpers/controllersHelper.js'
import Token from '../models/tokenModel.js'
import User from '../models/userModel.js'

export const createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: hashSync(req.body.password, 8)
  })
  try {
    const existentUsername = await User.findOne({ username: user.username })
    if (!existentUsername) {
      const createdUser = await user.save()
      const token = await createToken(createdUser)

      res.send({
        message: 'user created successfully!',
        user: {
          _id: createdUser._id,
          username: createdUser.username,
          token
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
  const user = await User.findById(objectId(req.params.id))
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
  const user = await User.findById(objectId(req.params.id))
  try {
    const { username, password } = req.body
    if (user) {
      validateToken(req, res, user, async () => {
        if (username) user.username = username
        if (password) user.password = hashSync(password, 8)
        const updatedUser = await user.save()
        res.send({ message: 'user updated successfully!', user: updatedUser })
      })
    } else {
      res.status(404).send({ message: 'user not found...' })
    }
  } catch (error) {
    res.status(500).send({ message: 'error updating user', error })
  }
}

export const deleteUser = async (req, res) => {
  const user = await User.findById(objectId(req.params.id))
  try {
    if (user) {
      validateToken(req, res, user, async () => {
        const deleteUser = await user.remove()

        const tokens = await Token.deleteMany({ user: user._id })

        res.send({
          message: 'user deleted successfully!',
          user: deleteUser,
          tokensDelete: tokens
        })
      })
    } else {
      res.status(404).send({ message: 'user does not exist...' })
    }
  } catch (error) {
    res.status(500).send({ message: 'error deleting user', error })
  }
}
