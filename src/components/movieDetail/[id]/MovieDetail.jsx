import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetail() {
  const { name, id } = useParams();
  const [movie, setMovie] = useState([]);
  const baseurl = import.meta.env.VITE_BASEURL;
  const apikey = import.meta.env.VITE_APIKEY;

  async function DetailMovie() {
    const response = await axios.get(
      `${baseurl}/${name}/${id}?api_key=${apikey}`
    );
    setMovie(response.data);
  }

  useEffect(() => {
    DetailMovie();
  }, []);

  return (
    <div className="text-white">
      <p>{movie.title}</p>
      <p>{id}</p>
    </div>
  );
}
