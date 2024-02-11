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

export async function GetOnAir() {
  const onAirList = await axios.get(
    `${baseurl}/tv/on_the_air?page=2&api_key=${apikey}`
  );
  return onAirList.data.results;
}

export async function GetPerson() {
  const personList = await axios.get(
    `${baseurl}/trending/person/day?language=en-US&api_key=${apikey}`
  );
  return personList.data.results;
}

export async function GetUpcomingMovie() {
  const upcomingList = await axios.get(
    `${baseurl}/movie/upcoming?page=2&api_key=${apikey}`
  );
  return upcomingList.data.results;
}

export async function GetTVPopular() {
  const TVList = await axios.get(
    `${baseurl}/watch/providers/tv?api_key=${apikey}`
  );
  return TVList.data.results;
}

export async function searchMovie(q) {
  const search = await axios.get(
    `${baseurl}/search/movie?query=${q}&api_key=${apikey}`
  );
  return search.data;
}