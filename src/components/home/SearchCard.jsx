import React from "react";

export default function SearchCard({ movie, img }) {
  return (
    <div className="flex flex-wrap  w-full items-center justify-center gap-[50px]">
      {movie.map((movies, i) => (
        <div key={i}>
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
