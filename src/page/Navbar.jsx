import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import InputSearch from "../components/navbar/InputSearch";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      className={`${
        scrolled > 0 ? "bg-secondary" : "bg-transparent"
      }   fixed text-white font-poppins py-4 px-10 w-full h-[60px] transition duration-300 z-[1000]`}
    >
      <div className="flex">
        <h1 className="font-racing text-[20px]">
          <span className="text-[#E50914]">NET</span>FREAK
        </h1>
        <div className="navlist">
          <ul className="flex ml-[100px] gap-[20px] ">
            <li className="hover:text-[#E50914]">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-[#E50914]">
              <Link>Movies</Link>
            </li>
            <li className="hover:text-[#E50914]">
              <Link>TV Show</Link>
            </li>
            <li className="hover:text-[#E50914]">
              <Link>Trending</Link>
            </li>
          </ul>
        </div>
        <InputSearch />
        <div>
          <button className="border-2 rounded border-white w-[95px] h-[28px] right-[150px] absolute bg-primary border-none text-[15px]">
            Log in
          </button>
          <button className="border-2 rounded border-white w-[95px] right-10 absolute bg-white text-black text-[15px]">
            Sign in
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
