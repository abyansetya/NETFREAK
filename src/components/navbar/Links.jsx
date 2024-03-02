import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React from "react";

const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

const Links = (props) => {
  const items = [
    { id: "/", title: "Home" },
    { id: "/movies", title: "Movies" },
    { id: "/tv", title: "TV Show" },
    { id: "/allmovies/Trending", title: "Trending" },
  ];

  function toggle() {
    props.setNav((prev) => !prev);
  }
  return (
    <motion.div
      variants={variants}
      className="absolute w-[100%] h-[100%] text-white flex flex-col items-center justify-center gap-[20px]"
    >
      <motion.h1 variants={itemVariants} className="text-white font-poppins">
        MENU
      </motion.h1>
      {items.map((item) => (
        <motion.a
          key={item}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="font-poppins text-[30px] font-bold text-white"
          onClick={toggle}
        >
          <Link to={`${item.id}`}>{item.title}</Link>
        </motion.a>
      ))}
      <motion.a
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="font-poppins text-[30px] font-bold text-white"
        onClick={toggle}
      >
        <Link
          to="/Bookmark"
          className="font-poppins text-[30px] font-bold text-white bg-primary px-4 rounded-xl py-1"
        >
          Bookmark
        </Link>
      </motion.a>
      <p className="bottom-2 absolute text-[13px]">© 2024 NETFREAK.</p>
    </motion.div>
  );
};

export default Links;
