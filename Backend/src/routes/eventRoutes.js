import express from 'express'
import {
  createEvent,
  getAllEvents,
  attendEvent,
  cancelAttendance
} from '../controllers/eventController.js'

import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

// 📝 Obtener todos los eventos
router.get('/', getAllEvents)

// ➕ Crear evento (protegido)
router.post('/', protect, createEvent)

// ✅ Confirmar asistencia (protegido)
router.patch('/:id/attend', protect, attendEvent)

// ❌ Cancelar asistencia (protegido)
router.patch('/:id/cancel', protect, cancelAttendance)

export default router
