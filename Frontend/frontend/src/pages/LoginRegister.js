import { loginOrRegister } from '../api/fetchAPI.js'
import Loader from '../components/Loader.js'

const LoginRegister = () => {
  const div = document.createElement('div')
  div.classList.add('page-container')

  let isRegister = false

  const renderForm = () => {
    div.innerHTML = `
      <h2>🔐 ${isRegister ? 'Registrarse' : 'Iniciar sesión'}</h2>
      <form id="auth-form">
        ${
          isRegister
            ? '<input type="text" name="name" placeholder="Nombre" required />'
            : ''
        }
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Contraseña" required />
        <button type="submit">${isRegister ? 'Crear cuenta' : 'Entrar'}</button>
      </form>
      <div id="auth-message"></div>
      <p style="text-align:center; margin-top:1rem;">
        ${isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'} 
        <a href="#" id="toggle-auth">${
          isRegister ? 'Inicia sesión' : 'Regístrate'
        }</a>
      </p>
    `

    const form = div.querySelector('#auth-form')
    const message = div.querySelector('#auth-message')
    const toggle = div.querySelector('#toggle-auth')

    toggle.addEventListener('click', (e) => {
      e.preventDefault()
      isRegister = !isRegister
      renderForm()
    })

    form.addEventListener('submit', async (e) => {
      e.preventDefault()

      const loader = Loader()
      message.innerHTML = ''
      message.appendChild(loader)

      const data = Object.fromEntries(new FormData(form))
      if (!isRegister) data.name = '' // no lo enviamos si es login

      const response = await loginOrRegister(data, isRegister)
      loader.remove()

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
  }

  renderForm()
  return div
}

export default LoginRegister
