// src/App.jsx
import './App.css';
import Ficha from './App/ficha';
import ItensDefault from './App/ItensDefault';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import ProtectedRoute from './ProtectedRoute';
import ItemPage from './components/ItemPage'; // Importa a página de criação de item
import ItemPageUpdate from './components/ItemPageUpdate'; // Importa a página de edição de item
import CharacterSheetPage from './App/fichaDoPersonagen'  // Importa a página de ficha do personagem

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

// Componente separado para poder acessar `useLocation`
function AppLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <div className="App">
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/item/create"
          element={
            <ProtectedRoute>
              <ItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/item/update/"
          element={
            <ProtectedRoute>
              {/* ITEM UPDATE nÃO VEM COM ID TEM QUE RESOLVER ISSO AI!!!! DEIXAREI PADRÃO ITEM 1 PARA ALTERAR */}
              <ItemPageUpdate  />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/ficha"
          element={
            <ProtectedRoute>
              <Ficha />
            </ProtectedRoute>
          }
        />
        <Route
          path="/itens"
          element={
            <ProtectedRoute>
              <ItensDefault />
            </ProtectedRoute>
          }
        />
        <Route
          path="/characters/:id/"
          element={
            <ProtectedRoute>
              <CharacterSheetPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
