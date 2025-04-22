import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio']
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria']
    },
    location: {
      type: String,
      required: [true, 'La ubicación es obligatoria']
    },
    date: {
      type: Date,
      required: [true, 'La fecha es obligatoria']
    },
    banner: {
      type: String,
      default: '' // URL del cartel del evento (puedes subirlo más adelante)
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
)

export const Event = mongoose.model('Event', eventSchema)
