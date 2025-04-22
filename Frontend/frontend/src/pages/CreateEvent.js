import { createEvent, uploadImage } from '../api/fetchAPI.js'

const CreateEvent = () => {
  const container = document.createElement('div')
  container.classList.add('page-container')
  container.innerHTML = `<h1>➕ Crear nuevo evento</h1>`

  const token = localStorage.getItem('token')

  if (!token) {
    container.innerHTML += `<p>⚠️ Debes iniciar sesión para crear eventos.</p>`
    return container
  }

  const form = document.createElement('form')
  form.innerHTML = `
    <input type="text" name="title" placeholder="Título del evento" required />
    <input type="text" name="location" placeholder="Ubicación" required />
    <input type="datetime-local" name="date" required />
    <input type="file" name="banner" accept="image/*" required />
    <textarea name="description" placeholder="Descripción del evento" required></textarea>
    <button type="submit">Crear evento</button>
    <div id="create-message"></div>
  `

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const file = formData.get('banner')

    // ☁️ Subimos la imagen a Cloudinary
    const imageUrl = await uploadImage(file)

    const data = {
      title: formData.get('title'),
      location: formData.get('location'),
      date: formData.get('date'),
      description: formData.get('description'),
      banner: imageUrl
    }

    const res = await createEvent(data, token)

    const msg = form.querySelector('#create-message')
    msg.textContent = res.message || '✅ Evento creado correctamente'

    if (res._id) {
      setTimeout(() => {
        history.pushState(null, null, '/')
        window.dispatchEvent(new Event('popstate'))
      }, 1500)
    }
  })

  container.appendChild(form)
  return container
}

export default CreateEvent
