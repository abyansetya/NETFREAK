import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiPlay1, CiBookmark, CiStar } from "react-icons/ci";

export default function MovieDetail() {
  const { name, id } = useParams();
  const [movie, setMovie] = useState([]);
  const [actress, setActress] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const baseurl = import.meta.env.VITE_BASEURL;
  const apikey = import.meta.env.VITE_APIKEY;
  const img = import.meta.env.VITE_BASEIMGURL;

  async function DetailMovie() {
    const response = await axios.get(
      `${baseurl}/${name}/${id}?api_key=${apikey}&append_to_response=videos`
    );
    setMovie(response.data);
  }

  async function Actress() {
    const getActress = await axios.get(
      `${baseurl}/${name}/${id}/credits?api_key=${apikey}`
    );
    setActress(getActress.data.cast);
  }

  async function fetchSelectedMovie() {
    const trailer = movie.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    console.log(trailer);
  }

  useEffect(() => {
    DetailMovie();
    Actress();
  }, []);

  return (
    <div className="text-white p-16 flex gap-[50px]">
      <div className=" ">
        <img
          src={`${img}/${movie.poster_path}`}
          alt=""
          className="w-[300px] rounded-xl"
        />
      </div>
      <div className="">
        <div className="flex items-center gap-[10px]">
          <h1 className="text-white font-bold text-[28px]">
            {name === "movie" ? movie.title : movie.name}
          </h1>
          {/* {(movie.release_date || movie.first_air_date) &&
            (movie.release_date.length > 4 ||
              movie.first_air_date.length > 4) && (
              <p className="text-[24px]">
                - {name === "movie" && movie.release_date?.substring(0, 4)}
                {name !== "movie" && movie.first_air_date?.substring(0, 4)}{" "}
              </p>
            )} */}
          {movie.release_date && movie.release_date.length > 4 ? (
            <p>{movie.release_date.substring(0, 4)}</p>
          ) : movie.first_air_date && movie.first_air_date.length > 4 ? (
            <p>{movie.first_air_date.substring(0, 4)}</p>
          ) : null}
        </div>
        <div className="flex gap-[5px] text-[12px] -mt-1">
          {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}{" "}
          <span className="text-[#E50914] ">●</span>
          <p className="underline">{movie.status}</p>
          <span className="text-[#E50914] ">●</span>
          {movie.release_date ? (
            <p>{movie.release_date}</p>
          ) : movie.first_air_date ? (
            <p>{movie.first_air_date}</p>
          ) : null}
        </div>
        <div>
          <p className=" mt-[20px] font-bold text-[#949494] ">Rating:</p>
          <div className="flex items-center gap-[5px]">
            <CiStar className="text-[20px] text-[#E50914]" />
            {movie.vote_average && movie.vote_average.toFixed(2)} / 10
          </div>
        </div>
        <div>
          <p className=" mt-[20px] font-bold text-[#949494] ">Overview:</p>
          <p className="w-[800px] text-[14px]">{movie.overview} </p>
        </div>
        <div>
          <h1 className="mt-[20px] font-bold text-[#949494]">
            Actor & Actress:
          </h1>
          <div className="flex ">
            {actress &&
              actress.slice(0, 5).map((actress, i) => (
                <React.Fragment key={i}>
                  <p>{actress.name}</p>
                  {i !== 4 && <span className="mr-2">, </span>}
                </React.Fragment>
              ))}
          </div>
        </div>
        <div className="mt-[20px] flex items-center gap-[30px]">
          <button
            onClick={() => fetchSelectedMovie(movie.id)}
            className="w-[200px] border-none bg-primary text-white rounded-full font-bold h-[40px] flex items-center justify-center gap-[20px] "
          >
            <CiPlay1 className="text-[20px]" />
            <p>Watch Trailer</p>
          </button>
          <button className="w-[200px] border-none bg-primary text-white rounded-full font-bold h-[40px] flex items-center justify-center gap-[20px] ">
            <CiBookmark className="text-[20px]" />
            <p>Bookmark</p>
          </button>
        </div>
      </div>
    </div>
  );
}
