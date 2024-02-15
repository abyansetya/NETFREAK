import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiPlay1, CiBookmark, CiStar } from "react-icons/ci";
import YouTube from "react-youtube";
import { GrClose } from "react-icons/gr";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function MovieDetail() {
  const { name, id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actress, setActress] = useState([]);
  const [modal, setModal] = useState(false);
  const baseurl = import.meta.env.VITE_BASEURL;
  const apikey = import.meta.env.VITE_APIKEY;
  const img = import.meta.env.VITE_BASEIMGURL;
  const [movieId, setMovieId] = useState("");
  const [loading, setLoading] = useState(true);

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
    setModal(true);
    // Check if movie is not empty and has the 'videos' property
    if (movie && movie.videos && movie.videos.results) {
      const trailer = movie.videos.results.find((vid) =>
        vid.name.toLowerCase().includes("trailer")
      );
      if (trailer) {
        setMovieId(trailer.key);
      } else {
        console.error("No suitable trailer found for the movie.");
      }
    } else {
      console.error("Videos data is not available for the movie.");
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await DetailMovie();
        await Actress();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <div className={`text-white p-16 flex gap-[50px] `}>
          <div className=" ">
            {loading ? (
              <Skeleton width={300} height={400} />
            ) : (
              <img
                src={`${img}/${movie.poster_path}`}
                alt=""
                className="w-[300px] rounded-xl"
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-[10px]">
              <h1 className="text-white font-bold text-[28px]">
                {loading ? (
                  <Skeleton width={200} />
                ) : name === "movie" ? (
                  movie.title
                ) : (
                  movie.name
                )}
              </h1>
              {loading ? null : movie.release_date &&
                movie.release_date.length > 4 ? (
                <p>{movie.release_date.substring(0, 4)}</p>
              ) : movie.first_air_date && movie.first_air_date.length > 4 ? (
                <p>{movie.first_air_date.substring(0, 4)}</p>
              ) : null}
            </div>
            <div className="flex gap-[5px] text-[12px] -mt-1">
              {loading
                ? null
                : movie.genres &&
                  movie.genres.map((genre) => genre.name).join(", ")}
              {loading ? null : <span className="text-[#E50914] ">●</span>}
              {loading ? null : <p className="underline">{movie.status}</p>}
              {loading ? null : <span className="text-[#E50914] ">●</span>}
              {loading ? null : movie.release_date ? (
                <p>{movie.release_date}</p>
              ) : movie.first_air_date ? (
                <p>{movie.first_air_date}</p>
              ) : null}
            </div>
            <div>
              <p className=" mt-[20px] font-bold text-[#949494] ">Rating:</p>
              <div className="flex items-center gap-[5px]">
                <CiStar className="text-[20px] text-[#E50914]" />
                {loading ? (
                  <Skeleton width={70} />
                ) : (
                  movie.vote_average && movie.vote_average.toFixed(2)
                )}{" "}
                / 10
              </div>
            </div>
            <div>
              <p className=" mt-[20px] font-bold text-[#949494] ">Overview:</p>
              <p className="max-w-[800px] text-[14px]">
                {loading ? <Skeleton count={3} /> : movie.overview}{" "}
              </p>
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
                onClick={fetchSelectedMovie}
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

            {modal && (
              <div className="absolute top-[50px] left-[100px] right-[100px] bottom-0 h-[700px] s bg-black z-[200] transition duration-1000 flex justify-center items-center ">
                <button onClick={() => setModal(false)}>
                  <GrClose className="absolute top-0 right-0 mx-6 mt-4" />
                </button>
                {movieId ? (
                  <YouTube
                    videoId={movieId}
                    opts={{ width: "848", height: "477" }}
                  />
                ) : (
                  <h1>VIDEO NOT FOUND</h1>
                )}
              </div>
            )}
          </div>
        </div>
      </SkeletonTheme>
    </>
  );
}
