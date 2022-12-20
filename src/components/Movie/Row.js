import axios from "../../Library/axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import { useNavigate } from "react-router-dom";

const row = ({ title, fetchUrl, isLargeRow = false }) => {
  const history = useNavigate();
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters" onClick={() => history("/player")}>
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              ></img>
            )
        )}
      </div>
    </div>
  );
};

export default row;