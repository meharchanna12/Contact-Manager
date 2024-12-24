import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element = {<Register />}/>
    </Routes>
  );
}

export default App;
