import User from '../models/userModel.js'

export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
        token: generateToken(user)
      })
      return
    }
  }
  res.status(401).send({ message: 'Invalid user email or password' })
}
