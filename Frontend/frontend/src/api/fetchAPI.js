// 🔐 Registro o login automático
export const loginOrRegister = async (data, isRegister = false) => {
  const endpoint = isRegister ? 'register' : 'login'

  try {
    const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    return await res.json()
  } catch (err) {
    return { message: 'Error en conexión con el servidor' }
  }
}

// 📥 Obtener todos los eventos
export const getEvents = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/events')
    return await res.json()
  } catch (err) {
    return []
  }
}

// ✅ Apuntarse a un evento
export const attendEvent = async (eventId, token) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/events/${eventId}/attend`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return await res.json()
  } catch (err) {
    return { message: 'Error al asistir' }
  }
}

// ❌ Cancelar asistencia a un evento
export const cancelAttendance = async (eventId, token) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/events/${eventId}/cancel`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return await res.json()
  } catch (err) {
    return { message: 'Error al cancelar asistencia' }
  }
}

// ➕ Crear nuevo evento
export const createEvent = async (data, token) => {
  try {
    const res = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    return await res.json()
  } catch (err) {
    return { message: 'Error al crear evento' }
  }
}

// ☁️ Subir imagen a Cloudinary
export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'evento_upload')

  try {
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/degsfs6qs/image/upload',
      {
        method: 'POST',
        body: formData
      }
    )

    const data = await res.json()
    return data.secure_url
  } catch (err) {
    console.error('❌ Error subiendo imagen', err)
    return null
  }
}
