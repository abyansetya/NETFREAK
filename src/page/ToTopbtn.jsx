import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function ToTopbtn() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {scroll > 100 && (
        <button
          onClick={backToTop}
          className={`w-[30px] h-[30px] border-none bg-primary rounded-full flex items-center justify-center fixed bottom-0 right-0 mr-[50px] mb-[50px] z-[10000]`}
        >
          <IoIosArrowUp />
        </button>
      )}
    </>
  );
}
