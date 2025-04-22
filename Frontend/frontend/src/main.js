import './styles/global.css'
import App from './App.js'

const root = document.getElementById('app')
root.innerHTML = ''
root.appendChild(App())
