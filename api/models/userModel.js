import { Model, Schema } from '../helpers/modelsHelper.js'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

const User = Model('User', userSchema)
export default User
