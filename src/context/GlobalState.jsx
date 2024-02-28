import React, { createContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  bookmark: localStorage.getItem("bookmark")
    ? JSON.parse(localStorage.getItem("bookmark"))
    : [],
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("bookmark", JSON.stringify(state.bookmark));
  }, [state]);

  //actions
  const addMovieToBookmark = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_BOOKMARK", payload: movie });
  };

  const removeMovieFromBookmark = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_BOOKMARK", payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        bookmark: state.bookmark,
        addMovieToBookmark,
        removeMovieFromBookmark,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
