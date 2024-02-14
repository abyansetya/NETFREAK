import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Pagination from "../components/Pagination";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AllMovies() {
  const { api } = useParams(); // Retrieve URL parameter
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const baseurl = import.meta.env.VITE_BASEURL;
  const apikey = import.meta.env.VITE_APIKEY;
  const img = import.meta.env.VITE_BASEIMGURL;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async (api, page) => {
      try {
        let response;
        let name;
        switch (api) {
          case "Trending":
            name = "movie";
            response = await axios.get(
              `${baseurl}/movie/popular?page=${page}&api_key=${apikey}`
            );
            break;
          case "nowplay":
            name = "movie";
            response = await axios.get(
              `${baseurl}/movie/now_playing?page=${page}&api_key=${apikey}`
            );
            break;
          case "banner":
            name = "tv";
            response = await axios.get(
              `${baseurl}/tv/top_rated?page=${page}&api_key=${apikey}`
            );
            break;
          case "onAir":
            name = "tv";
            response = await axios.get(
              `${baseurl}/tv/on_the_air?page=${page}&api_key=${apikey}`
            );
            break;
          case "upcoming":
            name = "movie";
            response = await axios.get(
              `${baseurl}/movie/upcoming?page=${page}&api_key=${apikey}`
            );
            break;
          default:
            response = { data: { results: [], total_pages: 1 } }; // Empty response for unknown API
            break;
        }
        setName(name);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages); // Set total pages
        // Turn off loading state when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Turn off loading state if there's an error
      }
    };
    // Fetch data based on the API specified in the URL parameter and current page
    fetchData(api, page);
  }, [api, page]);

  function moviedetail(movieId) {
    navigate(`/${name}/${movieId}`);
  }

  const handleImageLoad = () => {
    setLoading(false); // Set loading to false when any image is loaded
  };

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <div className="text-white p-16">
          <h1 className="m-4 text-[20px] font-bold">ALL Movies</h1>
          <div className="flex flex-wrap gap-[20px] justify-center">
            {movies.map((movie, i) => (
              <div key={i} className="" onClick={() => moviedetail(movie.id)}>
                <img
                  src={`${img}/${movie.poster_path}`}
                  alt=""
                  className="w-[200px] rounded"
                  onLoad={handleImageLoad}
                />
                {loading && ( // Show skeleton when loading
                  <Skeleton
                    height={300}
                    width={200}
                    style={{ marginRight: "10px" }}
                    className="rounded-xl"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </SkeletonTheme>
    </>
  );
}
