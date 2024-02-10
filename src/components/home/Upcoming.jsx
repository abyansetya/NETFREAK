import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RightArrow, LeftArrow } from "../home/Arrow";
import { PiArrowLeftLight } from "react-icons/pi";
import { PiArrowRight } from "react-icons/pi";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-[50%] -translate-y-[50%] h-[40px] w-[40px] rounded-full bg-gray-600 flex justify-center items-center  "
    >
      <PiArrowRight className="text-[20px]" />
    </button>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-[50%] z-[100] -translate-x-5 -translate-y-[50%] h-[40px] w-[40px] rounded-full bg-gray-600 flex justify-center items-center  "
    >
      <PiArrowLeftLight className="text-[20px]" />
    </button>
  );
}

export default function Upcoming({ movie, img }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <Slider {...settings}>
        {movie.map((movie, i) => {
          return (
            <div key={i} className="Movie-wrapper">
              <img
                src={`${img}/${movie.poster_path}`}
                alt={movie.title}
                className="Movie-image w-[150px] rounded-xl "
              />
            </div>
          );
        })}
      </Slider>
    </>
  );
}
