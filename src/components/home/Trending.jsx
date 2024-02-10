import React, { useState, useEffect } from "react";
import Card from "./Card";
import NowPlayCard from "./NowPlayCard";
import {
  GetMovieList,
  GetNowPlay,
  GetOnAir,
  MovieBanner,
  GetPerson,
  GetUpcomingMovie,
  GetTVPopular,
} from "../../data/api";
import BannerCard from "./BannerCard";
import OnAir from "./OnAir";
import Person from "./Person";
import Upcoming from "./Upcoming";
import TV from "./TV";

export default function Trending() {
  const [movies, setMovies] = useState([]);
  const [nowPlay, setNowPlay] = useState([]);
  const [banner, setBanner] = useState([]);
  const [onAir, setOnAir] = useState([]);
  const [person, setPerson] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [tvpopular, setTvpopular] = useState([]);

  const img = import.meta.env.VITE_BASEIMGURL;

  useEffect(() => {
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
    GetPerson().then((result) => {
      setPerson(result);
    });
    GetUpcomingMovie().then((result) => {
      setUpcoming(result);
    });
    GetTVPopular().then((result) => {
      setTvpopular(result);
    });
  }, []);

  return (
    <div className="text-white font-poppins h-[100vh]  relative z-[10]">
      <div className="w-full h-[20px] bg-black blur-sm top-0  absolute -translate-y-4"></div>
      <div className="innercontainy p-6">
        <div className="title">
          <h1 className="font-bold text-[20px]">Trending Movies</h1>
          <div className="h-[2px] bg-white w-[170px] mt-1" />
          <div className="Movie-container pt-6 ">
            <Card movie={movies} img={img} />
          </div>
        </div>
      </div>
      <div className="innercontainy p-6">
        <div className="title">
          <h1 className="font-bold text-[20px]">Now Playing</h1>
          <div className="h-[2px] bg-white w-[125px] mt-1" />
          <div className="Movie-container pt-6 ">
            <NowPlayCard movie={nowPlay} img={img} />
          </div>
        </div>
      </div>
      <div className="innercontainy p-6">
        <div className="title">
          <h1 className="font-bold text-[20px]">TOP TV Show</h1>
          <div className="h-[2px] bg-white w-[133px] mt-1" />
          <div className="Movie-container pt-6 ">
            <BannerCard movie={banner} img={img} />
          </div>
        </div>
      </div>
      <div className="innercontainy p-6">
        <div className="title">
          <h1 className="font-bold text-[20px]">On Air Show</h1>
          <div className="h-[2px] bg-white w-[125px] mt-1" />
          <div className="Movie-container pt-6 ">
            <OnAir movie={onAir} img={img} />
          </div>
        </div>
      </div>
      <div className="innercontainy p-6">
        <div className="title">
          <h1 className="font-bold text-[20px]">Actress/Actors</h1>
          <div className="h-[2px] bg-white w-[155px] mt-1" />
          <div className="Movie-container pt-6 ">
            <Person movie={person} img={img} />
          </div>
        </div>
      </div>
      <div className="innercontainy p-6">
        <div className="title">
          <h1 className="font-bold text-[20px]">Upcoming Movie</h1>
          <div className="h-[2px] bg-white w-[173px] mt-1" />
          <div className="Movie-container pt-6 ">
            <Upcoming movie={upcoming} img={img} />
          </div>
        </div>
      </div>
      <div className="innercontainy p-6">
        <div className="title">
          <h1 className="font-bold text-[20px]">Popular TV</h1>
          <div className="h-[2px] bg-white w-[115px] mt-1" />
          <div className="Movie-container pt-6 ">
            <TV movie={tvpopular} img={img} />
          </div>
        </div>
      </div>
    </div>
  );
}
