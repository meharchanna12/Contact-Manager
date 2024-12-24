import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <form>
        <h1>
            <img src="profile.png" alt="" />
            Login
        </h1>
        {/* Email Input */}
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />

        {/* Submit Button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
