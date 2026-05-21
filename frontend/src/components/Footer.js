import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">🩸 Blood<span>Link</span></div>
          <p>Connecting blood donors with those in need. Every donation saves a life. Join our network of heroes today.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/search">Search Donors</Link></li>
          </ul>
        </div>
        <div>
          <h4>Join Us</h4>
          <ul>
            <li><Link to="/donor/register">Become a Donor</Link></li>
            <li><Link to="/recipient/register">Register as Recipient</Link></li>
            <li><Link to="/donor/login">Donor Login</Link></li>
            <li><Link to="/recipient/login">Recipient Login</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 BloodLink. Built to save lives. Every drop counts.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
