import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiStar } from "react-icons/ci";
import { PiArrowLeftLight } from "react-icons/pi";
import { PiArrowRight } from "react-icons/pi";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-[45px] translate-x-2 h-[40px] w-[40px] rounded-full bg-gray-600 flex justify-center items-center  "
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
      className="absolute top-[45px] -translate-x-5 z-[100]  h-[40px] w-[40px] rounded-full bg-gray-600 flex justify-center items-center  "
    >
      <PiArrowLeftLight className="text-[20px]" />
    </button>
  );
}

export default function BannerCard({ movie, img }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
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
                src={`${img}/${movie.backdrop_path}`}
                alt={movie.title}
                className="Movie-image w-[230px] rounded-xl "
              />
              <p className="mt-2 ml-1 text-[14px] font-bold">{movie.name}</p>
              <div className="">
                <p className="ml-1 text-[12px]">
                  {movie.first_air_date.substring(0, 4)}
                </p>
                <div className="flex text-[12px] items-center ml-1 gap-[2px] ">
                  <CiStar />
                  <p>{movie.vote_average.toFixed(2)} / 10</p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
}
