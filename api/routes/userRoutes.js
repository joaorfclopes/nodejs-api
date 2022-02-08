import { createUser } from '../controllers/userController.js'
import { Router } from '../helpers/routesHelper.js'

const userRoute = Router()

userRoute.post('/create', createUser)

export default userRoute
