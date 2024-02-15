import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../../../page/NotFound";
import Loading from "../../../page/Loader/Loading";
import SearchCard from "../../home/SearchCard";

export default function Search() {
  const img = import.meta.env.VITE_BASEIMGURL;
  const { keyword } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function fetchSearchResults() {
      const baseurl = import.meta.env.VITE_BASEURL;
      const apikey = import.meta.env.VITE_APIKEY;
      try {
        const response = await axios.get(
          `${baseurl}/search/movie?query=${keyword}&api_key=${apikey}`
        );
        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSearchResults();
  }, [keyword]);

  return (
    <div className="text-white p-16">
      <div className="innercontainy">
        <div className="innercontainy p-6">
          <div className="title">
            <h1 className="font-bold text-[20px]">
              Results for <span className="text-[#E50914]">{keyword}</span>
            </h1>
            {loading ? (
              <div className="w-full h-[60vh] flex items-center justify-center">
                <Loading />
              </div>
            ) : searchResults.length === 0 ? (
              <NotFound />
            ) : (
              <div className="Movie-container pt-6">
                <SearchCard movie={searchResults} img={img} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
