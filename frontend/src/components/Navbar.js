import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-drop">🩸</span> BloodLink
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {!user ? (
            <>
              <Link to="/donor/login">Donor Login</Link>
              <Link to="/recipient/login">Recipient Login</Link>
              <Link to="/donor/register" className="btn-nav-primary">Register</Link>
            </>
          ) : user.role === 'donor' ? (
            <>
              <Link to="/donor/dashboard">Dashboard</Link>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/recipient/dashboard">Dashboard</Link>
              <Link to="/search">Search Donors</Link>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
