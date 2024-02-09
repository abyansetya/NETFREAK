import React from "react";
import axios from "axios";

const baseurl = import.meta.env.VITE_BASEURL;
const apikey = import.meta.env.VITE_APIKEY;

export async function GetMovieList() {
  const movieList = await axios.get(
    `${baseurl}/movie/popular?page=2&api_key=${apikey}`
  );
  return movieList.data.results;
}

export async function GetNowPlay() {
  const nowPlayList = await axios.get(
    `${baseurl}/movie/now_playing?page=2&api_key=${apikey}`
  );
  return nowPlayList.data.results;
}

export async function MovieBanner() {
  const bannerList = await axios.get(
    `${baseurl}/tv/top_rated?page=1&api_key=${apikey}`
  );
  return bannerList.data.results;
}
