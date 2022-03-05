import mongoose from 'mongoose'

export const objectId = id => {
  const isValid = mongoose.isValidObjectId(id)

  return isValid ? id : null
}

export const formatAuth = auth => {
  return auth.slice(7, auth.length)
}

export const Role = {
  ADMIN: 'admin',
  USER: 'user'
}
