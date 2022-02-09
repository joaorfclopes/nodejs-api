import { login } from '../controllers/authController.js'
import { Router } from '../helpers/routesHelper.js'

const authRoutes = Router()

authRoutes.post('/login', login)

export default authRoutes
