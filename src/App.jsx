import React, { useEffect, useState } from "react";
import Home from "./page/Home";
import Navbar from "./page/Navbar";
import Btn from "./page/ToTopbtn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./components/search/[keyword]/Search";
import NotFound from "./page/NotFound";
import AllMovies from "./page/AllMovies";
import MovieDetail from "./components/movieDetail/[id]/MovieDetail";
import Movies from "./page/Movies";
import TV from "./page/TV";
import Bookmark from "./page/Bookmark";
import { GlobalProvider } from "./context/GlobalState";

export default function App() {
  return (
    <GlobalProvider>
      <Router>
        <Navbar />
        <Btn />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/search/:keyword" element={<Search />} />
          <Route path="*" element={<NotFound />} />
          <Route exact path="/allmovies/:api" element={<AllMovies />} />
          <Route exact path="/:name/:id" element={<MovieDetail />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/tv" element={<TV />} />
          <Route exact path="/Bookmark" element={<Bookmark />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}
