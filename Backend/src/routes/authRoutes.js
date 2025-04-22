import express from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

// 🧪 Ruta protegida de prueba
router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'Ruta protegida accedida correctamente ✅',
    user: req.user
  })
})

export default router
