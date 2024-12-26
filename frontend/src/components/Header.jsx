import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.name;
  //exclude first letter from username
  const navigate = useNavigate(); // Hook for navigation

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');  // Redirect to login page after logout
  };
  const usernameShort = username?.substring(1);
  return (
    <header>
      {/* Left-aligned content */}
      <div className="left">
        <Link to="/"> 
        <img src="contacts.png" alt="" />
        Contact Manager
        </Link>
      </div>

      {/* Right-aligned content */}
      {token ? (
        <nav className="right">
        {/* <Link to="about">About</Link> */}
        <Link to="profile">Hello, {username}</Link>
        <a href="#" onClick={logout}>Logout</a>
      </nav>
      ) : (
        <nav className="right">
        {/* <Link to="about">About</Link> */}
        <Link to="login">Login</Link>
        <Link to="register">Register</Link>
      </nav>
      )

      }
      
    </header>
  );
}
