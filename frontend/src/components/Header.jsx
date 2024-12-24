import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      {/* Left-aligned content */}
      <div className="left">
        <Link to="/">Contact Manager</Link>
      </div>

      {/* Right-aligned content */}
      <nav className="right">
        <Link to="home">Home</Link>
        <Link to="login">Login</Link>
        <Link to="register">Register</Link>
      </nav>
    </header>
  );
}
