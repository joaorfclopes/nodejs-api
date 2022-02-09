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
  .get('/:id', findOne)
  .get('/', findAll)
  .put('/update/:id', isAuth, updateUser)
  .delete('/delete/:id', isAuth, deleteUser)

export default userRoutes
