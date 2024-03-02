import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Links from "./Links";

const variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      type: "linear",
      stiffness: 100,
    },
  },
  closed: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: {
      type: "linear",
      stiffness: 1000,
    },
  },
};

export default function MobileNav({ nav, setNav }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use setTimeout to delay the appearance of the animation
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Adjust the delay (in milliseconds) as needed

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
      <motion.div
        animate={nav ? "open" : "closed"}
        className="text-black px-20  "
      >
        <motion.div
          variants={variants}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          className="top-0 h-[101vh] right-0 w-full bg-black fixed"
        >
          <Links setNav={setNav} />
        </motion.div>
      </motion.div>
    </>
  );
}
