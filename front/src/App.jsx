// src/App.jsx

import './App.css'
import Ficha from './App/ficha'  // Importa o componente Ficha
import ItensDefault from './App/ItensDefault'  // Importa o componente ItensDefault
import Teste from './App/teste'
import CharacterSheetPage from './App/fichaDoPersonagen'  // Importa a página de ficha do personagem
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <h1>Teste do componente Ficha</h1>
      
      <Router>
        <Routes>
          <Route path="/characters/:id/" element={<CharacterSheetPage />} />
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
