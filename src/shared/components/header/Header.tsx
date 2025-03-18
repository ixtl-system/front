import "./styles.css";

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBookmark, FiLogOut, FiUser } from "react-icons/fi";

import { AuthContext } from "@/shared/context/AuthContext";

export const Header = () => {
  const { LogOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    LogOut();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Instituto Xamânico</h1>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/events">
                <FiBookmark />
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <FiUser />
              </Link>
            </li>
            <li>
              <button className="log-out-button" onClick={handleLogOut} title="Sair">
                <FiLogOut />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
