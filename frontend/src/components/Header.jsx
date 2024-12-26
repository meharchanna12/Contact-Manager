import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.name;
  //exclude first letter from username
  const usernameShort = username?.substring(1);
  return (
    <header>
      {/* Left-aligned content */}
      <div className="left">
        <Link to="/">Contact Manager</Link>
      </div>

      {/* Right-aligned content */}
      {token ? (
        <nav className="right">
        <Link to="home">About</Link>
        <Link to="profile">Hello, {username}</Link>
        <Link to="logout">Logout</Link>
      </nav>
      ) : (
        <nav className="right">
        <Link to="home">About</Link>
        <Link to="login">Login</Link>
        <Link to="register">Register</Link>
      </nav>
      )

      }
      
    </header>
  );
}
