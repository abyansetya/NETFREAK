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
      <div className="sm:pt-0 pt-[60px]">
        <Banner />
      </div>
      <Trending />
    </>
  );
}
