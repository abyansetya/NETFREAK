import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { FaRegTrashCan } from "react-icons/fa6";

export default function Bookmark() {
  useEffect(() => {
    document.title = "NETFREAK - Bookmark Page";
  }, []);

  const { bookmark } = useContext(GlobalContext);
  const { removeMovieFromBookmark } = useContext(GlobalContext);

  return (
    <div className="p-16 text-white ">
      <h1 className="m-4 text-[20px] font-bold">My Bookmark</h1>
      <div>
        {bookmark.length > 0 ? (
          <div className="flex flex-wrap gap-[20px] justify-start px-8">
            {bookmark.map((movie) => (
              <div key={movie.id}>
                <div className="flex-wrap">
                  {movie.poster_path ? (
                    <>
                      <img
                        src={`${import.meta.env.VITE_BASEIMGURL}/${
                          movie.poster_path
                        }`}
                        alt={`${movie.title}`}
                        className="w-[200px] rounded"
                      />
                      <div className="transition-all duration-300 w-[200px] absolute inline -translate-y-[100%] rounded h-[300px] z-[10] opacity-0 hover:opacity-100">
                        <div className="bg-black opacity-60 w-[200px] absolute inline rounded h-[300px]"></div>
                        <button
                          onClick={() => removeMovieFromBookmark(movie.id)}
                          className="absolute bottom-0 flex w-full items-center justify-center pb-[10px]"
                        >
                          <FaRegTrashCan className="text-[30px] opacity-100 hover:text-[#E50914]" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="w-[200px] h-[300px] bg-gray-500 rounded"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <h1 className="text-[24px] font-bold">No Bookmark yet</h1>
          </div>
        )}
      </div>
    </div>
  );
}
