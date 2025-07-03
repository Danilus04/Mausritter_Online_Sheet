import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../apiAcess"; // Importa a instância do axios configurada
import "./styles/Header.css"; // no topo

function Header() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  const handleCreateCharacter = () => {
    api.post("/characters/", {})  // Cria personagem com todos os campos como null
      .then((response) => {
        const newChar = response.data;
        navigate(`/characters/${newChar.id}/`);
      })
      .catch((err) => {
        console.error("Erro ao criar personagem:", err);
        alert("Erro ao criar personagem.");
      });
  };

  useEffect(() => {
    api
      .get("user/characters") // rota corrigida para listar do usuário autenticado
      .then((response) => setCharacters(response.data))
      .catch((error) => console.error("Erro ao buscar personagens:", error));
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <div className="nav-left">
          <Link to="/ficha" className="link">
            Meus Itens
          </Link>
          <Link to="/itens" className="link">
            Itens
          </Link>
          <Link to="/item/create" className="link">
            Criar Item
          </Link>
          <div className="dropdown">
            <span className="link">Personagens ▾</span>
            <div className="dropdown-content">
              {characters.length === 0 ? (
                <div>Nenhum personagem</div>
              ) : (
                characters.map((char) => (
                  <Link
                    key={char.id}
                    to={`/characters/${char.id}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/characters/${char.id}/`;
                    }}
                  >
                    {char.nameCharacter || `ID ${char.id}`}
                  </Link>
                ))
              )}
              <button
                onClick={handleCreateCharacter}
                className="link"
              >
                + Criar novo personagem
              </button>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="button-logout">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
