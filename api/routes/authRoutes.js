import { login, logout } from '../controllers/authController.js'
import { isAuth, Router } from '../helpers/routesHelper.js'

const authRoutes = Router()

authRoutes.post('/login', login).post('/logout/:id', isAuth, logout)

export default authRoutes
