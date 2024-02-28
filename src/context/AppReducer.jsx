export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_BOOKMARK":
      return {
        ...state,
        bookmark: [action.payload, ...state.bookmark],
      };
    case "REMOVE_MOVIE_FROM_BOOKMARK":
      return {
        ...state,
        bookmark: state.bookmark.filter((movie) => movie.id !== action.payload),
      };
    default:
      return state;
  }
};
