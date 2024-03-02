import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PiArrowLeftLight } from "react-icons/pi";
import { PiArrowRight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

export default function Card({ movie, img, poster, name }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movie.length > 0) {
      setLoading(false);
    }
  }, [movie]);



  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          swipeToSlide: true,
        },
      },
    ],
  };

  function moviedetail(movieId) {
    navigate(`/${name}/${movieId}`);
  }

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <Slider {...settings}>
          {loading
            ? Array.from({ length: 7 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height={225}
                  width={150}
                  style={{ marginRight: "10px" }}
                  className="rounded-xl"
                />
              ))
            : movie.map((movieItem, i) => (
                <button
                  key={i}
                  className="Movie-wrapper"
                  onClick={() => moviedetail(movieItem.id)}
                >
                  {["poster", "logo", "profile"].map(
                    (posterType, j) =>
                      movieItem[posterType + "_path"] && (
                        <React.Fragment key={j}>
                          <img
                            src={`${img}/${movieItem[posterType + "_path"]}`}
                            alt={movieItem.title}
                            className="Movie-image sm:w-[150px] w-[112px] rounded-xl"
                            // Update loading state when any image is loaded
                          />
                        </React.Fragment>
                      )
                  )}
                </button>
              ))}
        </Slider>
      </SkeletonTheme>
    </>
  );
}

