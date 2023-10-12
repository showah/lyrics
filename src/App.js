import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Lyrics from "./Lyrics";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Lyrics />} />
        <Route path="/:id" element={<Lyrics />} />
      </Routes>
    </div>
  );
}

export default App;