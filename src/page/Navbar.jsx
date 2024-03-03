import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import InputSearch from "../components/navbar/InputSearch";
import MobileNav from "../components/navbar/MobileNav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(0);
  const [nav, setNav] = useState(false);

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
    <>
      <motion.nav
        className={`${
          scrolled > 0 ? "bg-secondary" : "bg-transparent"
        }   fixed text-white font-poppins py-5 -top-1  px-10 w-full h-[60px] transition duration-300 z-[101]`}
      >
        <div className="flex">
          <Link to="/">
            <h1 className="font-racing text-[20px] z-[102]">
              <span className="text-[#E50914] text-[19px]">NET</span>FREAK
            </h1>
          </Link>
          <div className="navlist">
            <ul className=" ml-[100px] gap-[20px] md:flex hidden ">
              <li className="hover:text-[#E50914]">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-[#E50914]">
                <Link to="/movies">Movies</Link>
              </li>
              <li className="hover:text-[#E50914]">
                <Link to="/tv">TV Show</Link>
              </li>
              <li className="hover:text-[#E50914]">
                <Link to="/allmovies/Trending">Trending</Link>
              </li>
              <li className="border-2 rounded flex items-center justify-center border-white w-[100px] h-[28px] hover:bg-[#ec787e]  bg-primary border-none text-[15px]">
                <Link to="/Bookmark">Bookmark</Link>
              </li>
            </ul>
          </div>
          <InputSearch />
          <div>
            <button className="border-2 rounded ml-[20px] border-white w-[95px] right-20 absolute bg-white text-black text-[15px]">
              Sign in
            </button>
            <button
              onClick={() => setNav(!nav)}
              className="absolute right-10  text-[24px] md:hidden inline-block "
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MODAL */}
      <div className="md:hidden inline z-[100] relative">
        <MobileNav nav={nav} setNav={setNav} />
      </div>
    </>
  );
}
