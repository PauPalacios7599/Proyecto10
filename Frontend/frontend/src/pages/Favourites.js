import { getEvents, cancelAttendance } from '../api/fetchAPI.js'
import Loader from '../components/Loader.js'

const Favourites = () => {
  const container = document.createElement('div')
  container.classList.add('page-container')
  container.innerHTML = `<h1>⭐ Tus eventos favoritos</h1>`

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  if (!user) {
    container.innerHTML += `<p>⚠️ Debes iniciar sesión para ver tus eventos.</p>`
    return container
  }

  const loadFavourites = async () => {
    const loader = Loader()
    container.appendChild(loader)

    const events = await getEvents()
    container.removeChild(loader)

    const favourites = events.filter((event) =>
      event.attendees.some((att) => att._id === user.id)
    )

    if (favourites.length === 0) {
      container.innerHTML += `<p>No estás apuntado a ningún evento aún.</p>`
      return
    }

    const list = document.createElement('div')
    list.classList.add('event-grid')

    favourites.forEach((event) => {
      const card = document.createElement('div')
      card.classList.add('event-card')

      const attendeesNames =
        event.attendees.map((a) => a.name).join(', ') || 'Nadie aún'

      card.innerHTML = `
        <h3>${event.title}</h3>
        <p><strong>📍 Ubicación:</strong> ${event.location}</p>
        <p><strong>📅 Fecha:</strong> ${new Date(
          event.date
        ).toLocaleString()}</p>
        <p><strong>🧑‍💼 Creador:</strong> ${event.createdBy.name}</p>
        <p><strong>✅ Asistentes:</strong> ${attendeesNames}</p>
      `

      const button = document.createElement('button')
      button.classList.add('cancel-btn')
      button.textContent = '❌ No asistir'

      button.addEventListener('click', async () => {
        const res = await cancelAttendance(event._id, token)
        alert(res.message || 'Asistencia cancelada')
        window.location.reload()
      })

      card.appendChild(button)
      list.appendChild(card)
    })

    container.appendChild(list)
  }

  loadFavourites()

  return container
}

export default Favourites
