import React, { useEffect, useState } from "react";
import Home from "./page/Home";
import Navbar from "./page/Navbar";
import Btn from "./page/ToTopbtn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./components/search/[keyword]/Search";
import NotFound from "./page/NotFound";

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Btn />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/search/:keyword" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
