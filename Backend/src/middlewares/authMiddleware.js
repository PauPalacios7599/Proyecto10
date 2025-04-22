import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const protect = async (req, res, next) => {
  let token

  // Verificar encabezado Authorization con Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      // Verificamos el token y extraemos el ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Buscamos el usuario en la DB (sin mostrar la contraseña)
      const user = await User.findById(decoded.id).select('-password')

      if (!user) {
        return res.status(401).json({ message: 'Usuario ya no existe' })
      }

      req.user = user // Agregamos user al request
      next()
    } catch (error) {
      return res.status(401).json({ message: 'Token no válido' })
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, no hay token' })
  }
}
