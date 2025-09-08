import React from 'react';
import '../sass/NotFound.scss'; 
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you’re looking for doesn’t exist or was moved.</p>
      <Link to={"/"} className="home-btn">Go Back Home</Link>
    </div>
  );
}

export default NotFound;
