import { Model, Schema } from '../helpers/modelsHelper.js'

const tokenSchema = new Schema({
  user: { type: String, required: true },
  value: { type: String, required: true, unique: true },
  expired: { type: Boolean, required: true, default: false }
})

const Token = Model('Token', tokenSchema)
export default Token
