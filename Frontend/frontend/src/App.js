import { Router } from './router/index.js'
import Header from './components/Header.js'

const App = () => {
  const app = document.createElement('div')

  const headerContainer = document.createElement('div')
  const routerView = document.createElement('div')
  routerView.id = 'router-view' // para estilos y ubicación

  const render = () => {
    headerContainer.innerHTML = ''
    headerContainer.appendChild(Header())

    routerView.innerHTML = ''
    const view = Router()
    routerView.appendChild(view)
  }

  window.addEventListener('popstate', render)
  window.addEventListener('rebuild', render)

  render() // monta la primera vista

  app.appendChild(headerContainer)
  app.appendChild(routerView)

  return app
}

export default App
