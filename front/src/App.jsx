// src/App.jsx
import './App.css';
import Ficha from './App/ficha';
import ItensDefault from './App/ItensDefault';
import Teste from './App/teste';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import ProtectedRoute from './ProtectedRoute';
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
          path="/teste"
          element={
            <ProtectedRoute>
              <Teste />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
