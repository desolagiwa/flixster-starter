import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import { parseMovieData } from "./utils/utils";
import "./MovieList.css";
import { useState } from "react";
import Sidebar from "./Sidebar";

const MovieList = (props) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };


const handleFavoriteClick = (event, movie) => {
  event.stopPropagation();
  setFavoriteMovies((prevMovies) => [...prevMovies, movie  ]);
};

const handleWatchedClick = (event, movie) => {
  event.stopPropagation();
  setWatchedMovies((prevMovies) => [...prevMovies, movie]);
};

    const parsedData = parseMovieData(props);

    console.log(favoriteMovies);

    return (
      <>
      <button onClick={handleSidebarToggle}>Toggle Sidebar</button>
      <div className="full-container">
        {sidebarOpen && (
        <Sidebar
          favoriteMovies={favoriteMovies}
          watchedMovies={watchedMovies}
          onClose={handleSidebarToggle}
        />
      )}

      <div id="movie-cards">
        <div className="container">

        {parsedData.map(movie  => (
          <MovieCard title={movie.title} rating={movie.rating} image={movie.image} id={movie.id} onFavoriteClick={handleFavoriteClick}
          onWatchedClick={handleWatchedClick}/>
        ))}
      </div></div>


      </div></>
    );

}

export default MovieList;
