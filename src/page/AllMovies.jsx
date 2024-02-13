import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    const fetchData = async (api, page) => {
      try {
        let response;
        switch (api) {
          case "Trending":
            response = await axios.get(
              `${baseurl}/movie/popular?page=${page}&api_key=${apikey}`
            );
            break;
          case "nowplay":
            response = await axios.get(
              `${baseurl}/movie/now_playing?page=${page}&api_key=${apikey}`
            );
            break;
          case "banner":
            response = await axios.get(
              `${baseurl}/tv/top_rated?page=${page}&api_key=${apikey}`
            );
            break;
          case "onAir":
            response = await axios.get(
              `${baseurl}/tv/on_the_air?page=${page}&api_key=${apikey}`
            );
            break;
          case "upcoming":
            response = await axios.get(
              `${baseurl}/movie/upcoming?page=${page}&api_key=${apikey}`
            );
            break;
          default:
            response = { data: { results: [], total_pages: 1 } }; // Empty response for unknown API
            break;
        }
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages); // Set total pages
        setLoading(false); // Turn off loading state when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Turn off loading state if there's an error
      }
    };
    // Fetch data based on the API specified in the URL parameter and current page
    fetchData(api, page);
  }, [api, page]);

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <div className="text-white p-16">
          <h1 className="m-4 text-[20px] font-bold">ALL Movies</h1>
          <div className="flex flex-wrap gap-[20px] justify-center">
            {/* Check loading state before rendering */}
            {loading
              ? // Display Skeleton while loading
                Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="">
                    <Skeleton width={200} height={300} />
                  </div>
                ))
              : // Render movie posters when data is loaded
                movies.map((movie, i) => (
                  <div key={i} className="">
                    <img
                      src={`${img}/${movie.poster_path}`}
                      alt=""
                      className="w-[200px] rounded"
                    />
                  </div>
                ))}
          </div>
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </SkeletonTheme>
    </>
  );
}
