import { Router } from 'express'
import { getOrdenes, postOrdenes, getOrdenesByEmail } from '../controllers/ordenController.js'
import checkAuth from '../middleware/checkLogueo.js'
const router = Router()

//ORDENES
router.get('/all', checkAuth, getOrdenes)
router.post('/', checkAuth, postOrdenes)
router.get('/', checkAuth, getOrdenesByEmail)

export default router