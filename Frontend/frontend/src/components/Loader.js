const Loader = () => {
  const div = document.createElement('div')
  div.classList.add('loader')
  div.innerHTML = `<p>🔄 Cargando...</p>`
  return div
}

export default Loader
