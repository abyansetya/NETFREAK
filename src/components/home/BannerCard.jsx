import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiStar } from "react-icons/ci";
import { PiArrowLeftLight, PiArrowRight } from "react-icons/pi";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movie.length > 0) {
      setLoading(false);
    }
  }, [movie]);

  function moviedetail(movieId) {
    let name = "tv";
    navigate(`/${name}/${movieId}`);
  }

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <Slider {...settings}>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height={130}
                  width={230}
                  style={{ marginRight: "10px" }}
                  className="rounded-xl"
                />
              ))
            : movie.map((movieItem, i) => (
                <div
                  key={i}
                  className="Movie-wrapper"
                  onClick={() => moviedetail(movieItem.id)}
                >
                  {movieItem.backdrop_path && (
                    <>
                      <img
                        src={`${img}/${movieItem.backdrop_path}`}
                        alt={movieItem.title}
                        className="Movie-image w-[230px] rounded-xl "
                      />
                      <p className="mt-2 ml-1 text-[14px] font-bold">
                        {movieItem.name && movieItem.name}
                      </p>
                      <div className="">
                        <p className="ml-1 text-[12px]">
                          {movieItem.first_air_date &&
                            movieItem.first_air_date.substring(0, 4)}
                        </p>
                        <div className="flex text-[12px] items-center ml-1 gap-[2px] ">
                          <CiStar />
                          <p>{movieItem.vote_average.toFixed(2)} / 10</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
        </Slider>
      </SkeletonTheme>
    </>
  );
}
  