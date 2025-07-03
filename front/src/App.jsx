// src/App.jsx
import "./App.css";
import CharacterSheetPage from "./App/fichaDoPersonagen"; // Importa a página de ficha do personagem
import ItemsDoUsuario from "./App/ItemDoUsuario";
import ItensDefault from "./App/ItensDefault";
import Header from "./components/Header";
import ItemPage from "./components/items/ItemCreate"; // Importa a página de criação de item
import ItemPageUpdate from "./components/items/ItemUpdate"; // Importa a página de edição de item
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./ProtectedRoute";

import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

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
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";

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
          path="/item/update/:id"
          element={
            <ProtectedRoute>
              <ItemPageUpdate />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/ficha"
          element={
            <ProtectedRoute>
              <ItemsDoUsuario />
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
