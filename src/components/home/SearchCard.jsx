import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SearchCard({ movie, img }) {
  const navigate = useNavigate();
  function moviedetail(movieId) {
    const name = "movie";
    navigate(`/${name}/${movieId}`);
  }
  return (
    <div className="flex flex-wrap  w-full items-center  gap-[30px]">
      {movie.map((movies, i) => (
        <div
          onClick={() => moviedetail(movies.id)}
          key={i}
          className="hover:cursor-pointer"
        >
          {movies.poster_path && (
            <img
              src={`${img}/${movies.poster_path}`}
              alt=""
              className="Movie-image w-[150px] rounded-xl"
            />
          )}
        </div>
      ))}
    </div>
  );
}
