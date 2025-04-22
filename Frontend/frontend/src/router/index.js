import Home from '../pages/Home.js'
import Favourites from '../pages/Favourites.js'
import LoginRegister from '../pages/LoginRegister.js'
import CreateEvent from '../pages/CreateEvent.js'

export const Router = () => {
  const routes = {
    '/': Home,
    '/favourites': Favourites,
    '/login': LoginRegister,
    '/create': CreateEvent
  }

  const path = location.pathname
  const isLoggedIn = !!localStorage.getItem('token')

  // Bloquear acceso a rutas privadas si no está logueado
  if (!isLoggedIn && path !== '/login') {
    history.pushState(null, null, '/login')
    return LoginRegister()
  }

  const page = routes[path] || Home
  return page()
}
