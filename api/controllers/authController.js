import {
  activeToken,
  compareSync,
  generateToken
} from '../helpers/controllersHelper.js'
import User from '../models/userModel.js'

export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  try {
    if (user) {
      const userHasToken = await activeToken(user)

      if (!userHasToken) {
        compareSync(req.body.password, user.password) &&
          res.send({
            message: 'login successful!',
            _id: user._id,
            username: user.name,
            token: generateToken(user)
          })
      } else {
        res
          .status(400)
          .send({ message: 'user has currently an active session...' })
      }
    } else {
      res.status(401).send({ message: 'invalid username or password...' })
    }
  } catch (error) {
    res.status(500).send({ message: 'error logging in', error })
  }
}
