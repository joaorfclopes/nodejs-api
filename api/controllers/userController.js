import { generateToken, hashSync } from '../helpers/controllersHelper.js'
import User from '../models/userModel.js'

export const createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: hashSync(req.body.password)
  })
  try {
    const createdUser = await user.save()
    res.send({
      _id: createdUser._id,
      username: createdUser.username,
      token: generateToken(createdUser)
    })
  } catch (error) {
    res.status(401).send({ message: 'User could not be created...' })
  }
}
