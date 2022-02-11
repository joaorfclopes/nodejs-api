import {
  activeToken,
  compareSync,
  createToken
} from '../helpers/controllersHelper.js'
import Token from '../models/tokenModel.js'
import User from '../models/userModel.js'

export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  try {
    if (user) {
      const userHasToken = await activeToken(user)

      if (!userHasToken) {
        if (compareSync(req.body.password, user.password)) {
          const token = await createToken(user)

          res.send({
            message: 'login successful!',
            _id: user._id,
            username: user.name,
            token
          })
        } else {
          res.status(401).send({ message: 'invalid username or password...' })
        }
      } else {
        res
          .status(400)
          .send({ message: 'user has currently an active session...' })
      }
    } else {
      res.status(404).send({ message: 'user not found...' })
    }
  } catch (error) {
    res.status(500).send({ message: 'error logging in', error })
  }
}

export const logout = async (req, res) => {
  const user = await User.findById(req.params.id)
  try {
    if (user) {
      const tokens = await Token.find({ user: req.params.id, expired: false })
      if (tokens.length > 0) {
        tokens &&
          tokens.forEach(async token => {
            token.expired = true
            const updatedToken = await token.save()
          })

        res.send({ message: 'logout successful!' })
      } else {
        res.status(400).send({ message: 'user has no active sessions...' })
      }
    } else {
      res.status(404).send({ message: 'user not found...' })
    }
  } catch (error) {
    res.status(500).send({ message: 'error logging out', error })
  }
}
