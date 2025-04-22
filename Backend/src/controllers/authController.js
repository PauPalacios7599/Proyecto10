import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// 🔐 Función para generar el token
const generateToken = (userId) => {
  console.log('🔐 JWT_SECRET:', process.env.JWT_SECRET)
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })
}

// ✅ Registro + login automático
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    // Comprobar si ya existe
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear nuevo usuario
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    })

    // Generar token
    const token = generateToken(newUser._id)

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar
      },
      token
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error en el registro', error: error.message })
  }
}

// ✅ Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' })
    }

    const token = generateToken(user._id)

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al iniciar sesión', error: error.message })
  }
}
