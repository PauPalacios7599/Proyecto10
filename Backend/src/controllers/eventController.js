import { Event } from '../models/Event.js'

// ✅ Crear nuevo evento
export const createEvent = async (req, res) => {
  const { title, description, location, date, banner } = req.body

  try {
    const newEvent = await Event.create({
      title,
      description,
      location,
      date,
      banner,
      createdBy: req.user._id
    })

    res.status(201).json(newEvent)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al crear el evento', error: error.message })
  }
}

// ✅ Obtener todos los eventos (ordenados por fecha)
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('createdBy', 'name email')
      .populate('attendees', 'name email') // 👈 mostramos asistentes con datos
      .sort({ date: 1 })

    res.json(events)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener los eventos', error: error.message })
  }
}

// ✅ Confirmar asistencia a un evento
export const attendEvent = async (req, res) => {
  const { id } = req.params

  try {
    const event = await Event.findById(id)

    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }

    // Evitar duplicados
    if (event.attendees.includes(req.user._id)) {
      return res
        .status(400)
        .json({ message: 'Ya estás apuntado a este evento' })
    }

    event.attendees.push(req.user._id)
    await event.save()

    res.json({ message: 'Asistencia confirmada', event })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al asistir al evento', error: error.message })
  }
}

// ❌ Cancelar asistencia a un evento
export const cancelAttendance = async (req, res) => {
  const { id } = req.params

  try {
    const event = await Event.findById(id)

    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }

    // Filtramos el usuario actual fuera del array
    event.attendees = event.attendees.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    )

    await event.save()

    res.json({ message: 'Asistencia cancelada', event })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al cancelar asistencia', error: error.message })
  }
}
