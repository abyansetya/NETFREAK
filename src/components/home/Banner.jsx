import React, { useState, useEffect } from "react";
import movieData from "../../data/movieBanner";
import { FaPlay } from "react-icons/fa";
import { PiArrowLeftLight } from "react-icons/pi";
import { PiArrowRight } from "react-icons/pi";
import { GrClose } from "react-icons/gr";
import { motion } from "framer-motion";

export default function Banner() {
  const [idx, setIdx] = useState(0);
  const [modal, setModal] = useState(false);

  function increment() {
    if (idx == 14) {
      setIdx(0);
    } else {
      setIdx(idx + 1);
    }
  }

  function decrement() {
    if (idx == 0) {
      setIdx(14);
    } else {
      setIdx(idx - 1);
    }
  }

  const movie = movieData[idx];

  return (
    <motion.div
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="text-white flex max-h-[80vh] relative font-poppins z-[100]"
    >
      {movie && (
        <>
          <div className="absolute z-[100] px-[80px] h-[90%] flex flex-col justify-center w-full transition duration-1000 ease-linear ">
            <motion.button
              onClick={decrement}
              className="absolute top-[50%] left-0 ml-[20px] hover:bg-black borded-none flex items-center justify-center rounded-full w-[40px] h-[40px] transition duration-500"
            >
              <PiArrowLeftLight className="text-[25px]" />
            </motion.button>
            <button
              onClick={increment}
              className="absolute top-[50%] right-0 mr-[20px] hover:bg-black borded-none flex items-center justify-center rounded-full w-[40px] h-[40px] transition duration-500"
            >
              <PiArrowRight className="text-[25px]" />
            </button>
            <div className="flex items-center gap-5">
              <h1 className="font-bold text-[32px]">{movie.title}</h1>
              <p className="mt-1 border-none bg-primary p-1">
                {movie.ageLimit}
              </p>
            </div>
            <p className="w-[500px] mt-2 text-[14px]">{movie.description}</p>
            <button
              onClick={() => setModal(!modal)}
              className="w-[200px] border-none bg-primary text-white rounded-full font-bold h-[40px] flex items-center justify-center gap-[20px] mt-[50px]"
            >
              <FaPlay />
              Watch Trailer
            </button>
          </div>

          <img
            src={movie.bgImg}
            className="w-full relative object-cover"
            alt=""
          />
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-black opacity-60" />
          <div className="h-[30px] bg-black w-full z-[110] absolute bottom-0 left-0 right-0 blur-sm translate-y-3"></div>
        </>
      )}

      {/*modal */}
      {modal && (
        <div className="absolute top-[50px] left-[100px] right-[100px] bottom-0 h-[700px] s bg-black z-[200] transition duration-1000 flex justify-center items-center ">
          <button onClick={() => setModal(false)}>
            <GrClose className="absolute top-0 right-0 mx-6 mt-4" />
          </button>
          <iframe
            width="848"
            height="477"
            src={movie.video}
            title={`${movie.title} | Official Trailer`}
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="max-w-[1280px] max-h-[720px] top-[100px] absolute blur-none"
          ></iframe>
        </div>
      )}
    </motion.div>
  );
}
