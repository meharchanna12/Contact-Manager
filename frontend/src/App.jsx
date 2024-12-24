import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Login from "./components/Login";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
