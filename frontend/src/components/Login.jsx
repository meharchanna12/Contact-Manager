import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  async function onSubmit(ev) {
    ev.preventDefault();
    
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    setLoading(true);  

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      }, { withCredentials: true });

      console.log(response); 
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));  
        console.log(response.data.user);
        setRedirect(true); 
      } else {
        setError("Wrong credentials");
      }
    } catch (err) {
      console.log(err);  
      setError(
        err.response?.data?.message || "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false); 
    }
  }
  if (redirect) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="login">
      <form onSubmit={onSubmit}>
        <h1>
          <img src="profile.png" alt="profile" />
          Login
        </h1>


        {error && <p style={{ color: "red" }}>{error}</p>}


        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />


        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
