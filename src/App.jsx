import React, { useEffect, useState } from "react";
import Home from "./page/Home";
import Navbar from "./page/Navbar";
import Btn from "./page/ToTopbtn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Btn />

        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}
