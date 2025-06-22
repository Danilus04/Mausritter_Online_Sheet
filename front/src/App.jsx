// src/App.jsx

import './App.css'
import ItemPageCreate from './App/ItemPageCreate'  // Importa o componente Ficha
import ItemPageEdit from './App/ItemPageUpdate'
import api from './apiAcess'

function App() {
  
  return (
    <>
      <ItemPageEdit item={} />  {/* Renderiza o componente aqui */}
    </>
  )
}

export default App
