import { getEvents, attendEvent } from '../api/fetchAPI.js'
import Loader from '../components/Loader.js'

const Home = () => {
  const container = document.createElement('div')
  container.innerHTML = `<h1>🏠 Página de inicio</h1>`

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  const loader = Loader()
  container.appendChild(loader)

  const loadEvents = async () => {
    const events = await getEvents()
    container.removeChild(loader)

    if (events.length === 0) {
      container.innerHTML += `<p>No hay eventos disponibles.</p>`
      return
    }

    const list = document.createElement('div')
    list.classList.add('event-grid')

    events.forEach((event) => {
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

      if (user) {
        const yaInscrito = event.attendees.some((a) => a._id === user.id)

        const button = document.createElement('button')
        button.textContent = yaInscrito ? '✅ Ya estás inscrito' : 'Asistir'
        button.disabled = yaInscrito

        if (!yaInscrito) {
          button.addEventListener('click', async () => {
            const res = await attendEvent(event._id, token)
            alert(res.message || 'Asistencia confirmada')
            window.location.reload()
          })
        }

        card.appendChild(button)
      }

      list.appendChild(card)
    })

    container.appendChild(list)
  }

  loadEvents()

  return container
}

export default Home
