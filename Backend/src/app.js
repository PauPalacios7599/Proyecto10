import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import eventRoutes from './routes/eventRoutes.js'

dotenv.config()

const app = express()
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'Servidor funcionando 🔥' })
})

// Iniciar servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`))
