import { welcome } from '../controllers/welcomeController.js'
import { Router } from '../helpers/routesHelper.js'

const welcomeRoutes = Router()

welcomeRoutes.get('/', welcome)

export default welcomeRoutes
