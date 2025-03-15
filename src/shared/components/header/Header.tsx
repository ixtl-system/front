import "./styles.css";

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "@/shared/context/AuthContext"; // Contexto de autenticação

export const Header = () => {
  const { LogOut } = useContext(AuthContext); // Pega o estado de login do contexto
  const navigate = useNavigate();

  // Função para lidar com o logout
  const handleLogOut = () => {
    LogOut();
    navigate("/"); // Redireciona para a tela de login após o logout
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Instituto Xamânico</h1>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/events">Eventos</Link>
            </li>
            <li>
              <Link to="/profile">Perfil</Link>
            </li>
            <li>
              <button className="log-out-button" onClick={handleLogOut}>
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
