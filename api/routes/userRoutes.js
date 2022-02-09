import {
  createUser,
  deleteUser,
  findAll,
  findOne,
  updateUser
} from '../controllers/userController.js'
import { isAuth, Router } from '../helpers/routesHelper.js'

const userRoutes = Router()

userRoutes
  .post('/create', createUser)
  .get('/:user', findOne)
  .get('/', findAll)
  .put('/update/:user', isAuth, updateUser)
  .delete('/delete/:user', isAuth, deleteUser)

export default userRoutes
