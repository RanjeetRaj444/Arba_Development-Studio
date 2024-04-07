import React, { useEffect, useState } from "react";

// import { Routes, Route } from "react-router-dom"
import "./App.css";
// import HomePage from "./pages/HomePage";
// import PrivateRoutes from "./routes/PrivateRoutes";
import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div className="App">
      <div></div>
      <div>
        <Navbar />
        <MainRoutes />
      </div>
    </div>
  );
};

export default App;
