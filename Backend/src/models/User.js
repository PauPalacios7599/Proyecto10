import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio']
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      match: [/.+\@.+\..+/, 'Email no válido']
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria']
    },
    avatar: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

export const User = mongoose.model('User', userSchema)
