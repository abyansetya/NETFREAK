import React from "react";
import Banner from "../components/home/Banner.jsx";
import Trending from "../components/home/Trending.jsx";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "NETFREAK - Home Page";
  }, []);
  return (
    <>
      <Banner />
      <Trending />
    </>
  );
}
