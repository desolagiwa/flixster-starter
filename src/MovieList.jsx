import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import { parseMovieData } from "./utils/utils";
import "./MovieList.css";

const MovieList = (props) => {

    const parsedData = parseMovieData(props);


    return (
      <div>
      <div id="movie-cards">
        <div className="container">

        {parsedData.map(movie  => (
          <MovieCard title={movie.title} rating={movie.rating} image={movie.image} id={movie.id} />
        ))}
      </div></div>
      </div>
    );

}

export default MovieList;
