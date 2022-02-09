import {
  createUser,
  deleteUser,
  findAll,
  findUser,
  updateUser
} from '../controllers/userController.js'
import { Router } from '../helpers/routesHelper.js'

const userRoute = Router()

userRoute
  .post('/create', createUser)
  .get('/find', findUser)
  .get('/findAll', findAll)
  .put('/update', updateUser)
  .delete('/delete', deleteUser)

export default userRoute
