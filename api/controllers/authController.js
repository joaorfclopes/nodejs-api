import { compareSync, generateToken } from '../helpers/controllersHelper.js'
import User from '../models/userModel.js'

export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  try {
    if (user) {
      if (compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          username: user.name,
          token: generateToken(user)
        })
        return
      }
    }
    res.status(401).send({ message: 'invalid username or password...' })
  } catch (error) {
    res.status(500).send({ message: 'error logging in', error })
  }
}
