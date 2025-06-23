// src/App.jsx

import './App.css'
import Ficha from './App/ficha'  // Importa o componente Ficha
import ItensDefault from './App/ItensDefault'  // Importa o componente ItensDefault
import Teste from './App/teste'
import Login from './Login'

function App() {
  return (
    <>
      <h1>Teste do componente Ficha</h1>
      <ItensDefault/>  {/* Renderiza o componente aqui */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ficha" element={<Ficha />} />
          <Route path="/itens" element={<ItensDefault />} />
          <Route path="/teste" element={<Teste />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
