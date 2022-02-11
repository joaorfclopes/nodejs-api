import { login, logout } from '../controllers/authController.js'
import { Router } from '../helpers/routesHelper.js'

const authRoutes = Router()

authRoutes.post('/login', login).post('/logout/:id', logout)

export default authRoutes
