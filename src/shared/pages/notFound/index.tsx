import "./styles.css";

import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        Go Back Home
      </Link>
    </div>
  );
};
