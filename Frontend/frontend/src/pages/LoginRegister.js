import { loginOrRegister } from '../api/fetchAPI.js'

const LoginRegister = () => {
  const div = document.createElement('div')
  div.classList.add('page-container')
  div.innerHTML = `
    <h2>🔐 Acceso</h2>
    <form id="auth-form">
      <input type="text" name="name" placeholder="Nombre" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>
    <div id="auth-message"></div>
  `

  const form = div.querySelector('#auth-form')
  const message = div.querySelector('#auth-message')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(form))
    const response = await loginOrRegister(data)

    if (response.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      message.textContent = '✅ Autenticación correcta. Redirigiendo...'
      setTimeout(() => {
        history.pushState(null, null, '/')
        window.dispatchEvent(new Event('popstate'))
      }, 1000)
    } else {
      message.textContent = response.message || '❌ Error al autenticar'
    }
  })

  return div
}

export default LoginRegister
