import React, { useState, useEffect } from "react";
import Card from "./Card";
import {
  GetMovieList,
  GetNowPlay,
  GetOnAir,
  MovieBanner,
  GetUpcomingMovie,
} from "../../data/api";
import BannerCard from "./BannerCard";
import { Link } from "react-router-dom";


export default function Trending() {
  const [movies, setMovies] = useState([]);
  const [nowPlay, setNowPlay] = useState([]);
  const [banner, setBanner] = useState([]);
  const [onAir, setOnAir] = useState([]);
  const [loading, setLoading] = useState(false);
  const [upcoming, setUpcoming] = useState([]);

  const img = import.meta.env.VITE_BASEIMGURL;

  useEffect(() => {
    setLoading(true);
    try {
      GetMovieList().then((result) => {
        setMovies(result);
      });
      GetNowPlay().then((result) => {
        setNowPlay(result);
      });
      MovieBanner().then((result) => {
        setBanner(result);
      });
      GetOnAir().then((result) => {
        setOnAir(result);
      });

      GetUpcomingMovie().then((result) => {
        setUpcoming(result);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="text-white font-poppins h-[100vh]  relative z-[10]">
      <div className="w-full h-[20px] bg-black blur-sm top-0  absolute -translate-y-4"></div>
      <div className="innercontainy p-6">
        <div className="title ">
          <div className="head flex w-full justify-between  items-center">
            <div className="flex flex-col">
              <h1 className="font-bold text-[20px] ">Trending Movies</h1>
              <div className="h-[2px] bg-white w-[170px] mt-1" />
            </div>
            <Link to="/allmovies/Trending">
              <p className="pr-6 underline hover:text-[#E50914]">
                See All Movies
              </p>
            </Link>
          </div>
          <div className="Movie-container pt-6 ">
            <Card movie={movies} img={img} poster="poster" name="movie" />
          </div>
        </div>
      </div>
      <div className="innercontainy p-6">
        <div className="title">
          <div className="head flex w-full justify-between  items-center">
            <div className="flex flex-col">
              <h1 className="font-bold text-[20px]">Now Playing </h1>
              <div className="h-[2px] bg-white w-[130px] mt-1" />
            </div>
            <Link to="/allmovies/nowplay">
              <p className="pr-6 underline hover:text-[#E50914]">
                See All Movies
              </p>
            </Link>
          </div>
          <div className="Movie-container pt-6 ">
            <Card movie={nowPlay} img={img} poster="poster" name="movie" />
          </div>
        </div>
      </div>
      <div className="innercontainy p-6">
        <div className="title">
          <div className="head flex w-full justify-between  items-center">
            <div className="flex flex-col">
              <h1 className="font-bold text-[20px]">Top TV Show</h1>
              <div className="h-[2px] bg-white w-[130px] mt-1" />
            </div>
            <Link to="/allmovies/banner">
              <p className="pr-6 underline hover:text-[#E50914]">
                See All Shows
              </p>
            </Link>
          </div>
          <div className="Movie-container pt-6 ">
            <BannerCard movie={banner} img={img} poster="backdrop" name="tv" />
          </div>
        </div>
      </div>
      <div className="innercontainy p-6">
        <div className="title">
          <div className="head flex w-full justify-between  items-center">
            <div className="flex flex-col">
              <h1 className="font-bold text-[20px]">On Air TV Show</h1>
              <div className="h-[2px] bg-white w-[150px] mt-1" />
            </div>
            <Link to="/allmovies/onAir">
              <p className="pr-6 underline hover:text-[#E50914]">
                See All Shows
              </p>
            </Link>
          </div>
          <div className="Movie-container pt-6 ">
            <Card movie={onAir} img={img} poster="poster" name="tv" />
          </div>
        </div>
      </div>
      <div className="innercontainy p-6">
        <div className="title">
          <div className="head flex w-full justify-between  items-center">
            <div className="flex flex-col">
              <h1 className="font-bold text-[20px]">Upcoming Movies</h1>
              <div className="h-[2px] bg-white w-[185px] mt-1" />
            </div>
            <Link to="/allmovies/upcoming">
              <p className="pr-6 underline hover:text-[#E50914]">
                See All Movies
              </p>
            </Link>
          </div>
          <div className="Movie-container pt-6 ">
            <Card movie={upcoming} img={img} poster="poster" name="movie" />
          </div>
        </div>
      </div>
    </div>
  );
}
