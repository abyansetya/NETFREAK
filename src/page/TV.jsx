import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState("Trending");
  const [imageLoading, setImageLoading] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const baseurl = import.meta.env.VITE_BASEURL;
  const apikey = import.meta.env.VITE_APIKEY;
  const img = import.meta.env.VITE_BASEIMGURL;

  const fetchData = useCallback(
    async (page) => {
      setLoading(true);
      try {
        let response;
        switch (name) {
          case "Trending":
            response = await axios.get(
              `${baseurl}/tv/airing_today?page=${page}&api_key=${apikey}`
            );
            break;
          case "nowplaying":
            response = await axios.get(
              `${baseurl}/tv/on_the_air?page=${page}&api_key=${apikey}`
            );
            break;
          case "topliked":
            response = await axios.get(
              `${baseurl}/tv/popular?page=${page}&api_key=${apikey}`
            );
            break;
          case "upcoming":
            response = await axios.get(
              `${baseurl}//tv/top_rated?page=${page}&api_key=${apikey}`
            );
            break;
          default:
            response = { data: { results: [] } }; // Empty response for unknown API
            break;
        }
        setTotalPages(response.data.total_pages); // Set total pages

        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [name, page]
  );

  useEffect(() => {
    fetchData(page);
  }, [fetchData]);

  const handleImageLoad = (index) => {
    const updatedImageLoading = [...imageLoading];
    updatedImageLoading[index] = false;
    setImageLoading(updatedImageLoading);
  };

  const moviedetail = (id) => {
    navigate(`/tv/${id}`);
  };

  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <div className="text-white p-16">
        <div className="flex gap-[20px] ">
          <button
            onClick={() => {
              setName("Trending");
              setPage(1);
            }}
            className={` transition duration-300 border-2 border-none py-[10px] px-[25px] active:bg-primary flex items-center justify-center text-[14px] ${
              name === "Trending" ? "bg-primary" : "bg-[#191919]"
            }`}
          >
            Airing Today
          </button>
          <button
            onClick={() => {
              setName("nowplaying");
              setPage(1);
            }}
            className={` transition duration-300 border-2 border-none py-[10px] px-[25px] flex items-center justify-center text-[14px] ${
              name === "nowplaying" ? "bg-primary" : "bg-[#191919]"
            }`}
          >
            On The Pair
          </button>
          <button
            onClick={() => {
              setName("topliked");
              setPage(1);
            }}
            className={` transition duration-300 border-2 border-none py-[10px] px-[25px] flex items-center justify-center text-[14px] ${
              name === "topliked" ? "bg-primary" : "bg-[#191919]"
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => {
              setName("upcoming");
              setPage(1);
            }}
            className={` transition duration-300 border-2 border-none py-[10px] px-[25px] flex items-center justify-center text-[14px] ${
              name === "upcoming" ? "bg-primary" : "bg-[#191919]"
            }`}
          >
            Top Rated
          </button>
        </div>
        <div className="flex flex-wrap gap-[20px] justify-center pt-[50px]">
          {movies.map((movie) => (
            <div key={movie.id} onClick={() => moviedetail(movie.id)}>
              <img
                src={`${img}/${movie.poster_path}`}
                alt=""
                className={`hover:cursor-pointer ${
                  loading ? "hidden" : null
                } w-[200px] rounded`}
              />
              {loading ? ( // Show skeleton when loading or image is not loaded
                <Skeleton
                  height={300}
                  width={200}
                  style={{ marginRight: "10px" }}
                  className="rounded-xl"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        setLoading={setLoading}
      />
    </SkeletonTheme>
  );
};

export default Movies;
