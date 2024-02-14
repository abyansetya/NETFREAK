import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import { useDebounce } from "use-debounce";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import NotFound from "../../page/NotFound";

const baseurl = import.meta.env.VITE_BASEURL;
const apikey = import.meta.env.VITE_APIKEY;

export default function InputSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [cross, setCross] = useState(false);

  const navigate = useNavigate();

  function removeSearch(e) {
    if (e.target.tagName.toLowerCase() !== "button") {
      setCross(false);
      setQuery("");
    }
  }

  const [debouncedQuery] = useDebounce(query, 500);

  async function searchMovies(e) {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `${baseurl}/search/movie?api_key=${apikey}&query=${debouncedQuery}`
      );
      setResults(response.data.results);
    } catch (error) {
      <NotFound />;
      console.error("Error fetching search results:", error);
      setResults([]);
    }
  }

  async function submitMovies(e) {
    e.preventDefault();

    const keyword = query;
    if (keyword.length > 0) {
      navigate(`/search/${keyword}`);
      setQuery("");
    }
  }

  useEffect(() => {
    searchMovies();
  }, [debouncedQuery]);

  const name = "movie";

  return (
    <div className="text-black">
      <form onSubmit={submitMovies} className="">
        <div
          onClick={() => setCross(true)}
          className="border-black ml-[80px]  text-[12px]  flex"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-black rounded w-[250px] px-3"
            placeholder="Find Movie"
          />
          {cross && query.length > 0 ? (
            <button
              onClick={(e) => removeSearch(e)}
              className="ml-2 mt-[6px] -translate-x-9 text-black -translate-y-[2px] text-[20px]"
            >
              <RxCross2 className="" />
            </button>
          ) : (
            <IoSearchOutline className="ml-2 mt-[6px] -translate-x-9 text-black -translate-y-[2px] text-[20px]" />
          )}
          <button type="submit" className="hidden"></button>
        </div>
      </form>
      <div className="flex ml-[80px] absolute   ">
        {query.length > 0 && (
          <div className="h-[400px] w-[250px] rounded bg-white mt-2 overflow-y-auto">
            {results.length > 0 ? (
              results.map((result) => (
                <Link to={`${name}/${result.id}`} onClick={() => setQuery("")}>
                  <div
                    key={result.id}
                    className="flex items-center justify-start"
                  >
                    <IoSearchOutline className="text-black ml-1 w-[20px] " />
                    <p className="text-black mx-2 m-2 text-[15px]  ">
                      {result.title}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="w-full flex items-center justify-center h-full">
                <p>not found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
