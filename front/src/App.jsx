// src/App.jsx

import './App.css'
import Ficha from './App/ficha'  // Importa o componente Ficha
import ItensDefault from './App/ItensDefault'  // Importa o componente ItensDefault
import Teste from './App/teste'

function App() {
  return (
    <>
      <h1>Teste do componente Ficha</h1>
      <ItensDefault/>  {/* Renderiza o componente aqui */}
    </>
  )
}

export default App
