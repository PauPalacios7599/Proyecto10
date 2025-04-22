const Header = () => {
  const nav = document.createElement('nav')

  const user = JSON.parse(localStorage.getItem('user'))

  // Contenedor principal del header
  const container = document.createElement('div')
  container.classList.add('nav-container')

  // Logo
  const logo = document.createElement('div')
  logo.classList.add('logo')
  logo.textContent = 'EventoPro'

  // Enlaces
  const links = document.createElement('div')
  links.classList.add('nav-links')
  links.innerHTML = `
    <a href="/" data-link>Home</a> |
    <a href="/favourites" data-link>Favourites</a> |
    <a href="/create" data-link>➕ Crear evento</a> |
    <a href="/login" data-link>${
      user ? '👋 Cerrar sesión' : '🔐 Login/Register'
    }</a>
  `

  // Añadir logo y links al contenedor
  container.appendChild(logo)
  container.appendChild(links)
  nav.appendChild(container)

  // Evento de navegación SPA
  nav.addEventListener('click', (e) => {
    if (e.target.matches('a[data-link]')) {
      e.preventDefault()
      const href = e.target.getAttribute('href')

      if (href === '/login' && user) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        alert('👋 Sesión cerrada correctamente')
        window.dispatchEvent(new Event('rebuild'))
        return
      }

      history.pushState(null, null, href)
      window.dispatchEvent(new Event('popstate'))
    }
  })

  return nav
}

export default Header
