import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./MovieCard.css"
import Modal from "./Modal";
import { useState } from "react";
import { useEffect } from "react";
import { getMovieDetails } from "./utils/utils";


const MovieCard = (props) => {
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const id = props.id;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const TRAILER_API_ENDPOINT = 'https://api.themoviedb.org/3/movie/';
  const [trailerData, setTrailerData] = useState([]);

  const onFavoriteClick = props.onFavoriteClick;
  const onWatchedClick = props.onWatchedClick;

  const handleCardClick = () => {
    setIsClicked(!isClicked);
    setSelectedMovie(props.id);

  }


    useEffect(() => {
        fetchData();
        fetchTrailerData();

    }, [isClicked]);

    const INFO_API_ENDPOINT = 'https://api.themoviedb.org/3/movie/'

    const fetchData = async () => {
        try {

            const apiKey = import.meta.env.VITE_API_KEY;
            const url = `${INFO_API_ENDPOINT}${id}?language=en-US&api_key=${apiKey}`;
            const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            }
            });
            if (!response.ok) {
            throw new Error('Failed to fetch movie details');
            }
            const data = await response.json();
            setMovieDetails(getMovieDetails(data));

            setData(data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    const fetchTrailerData = async () => {
        try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const url = `${TRAILER_API_ENDPOINT}${id}/videos`;
            const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            }
            });
            if (!response.ok) {
            throw new Error('Failed to fetch movie details');
            }
            const data = await response.json();
            console.log("abcd",data);
            setTrailerData(data.results[0].key);
            console.log(data.results[0].key);
            console.log("new ",trailerData);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    console.log("outside ",trailerData)

    const trailer_url = `https://www.youtube.com/embed/${trailerData}`






  return(
      <span className="card" onClick={handleCardClick}>
          <img className="image" src={`https://image.tmdb.org/t/p/w185${props.image}`} />
          <h3 className="title">{props.title}</h3>
          <div><p className="rating">⭐️ {props.rating}</p></div>
          <button className="favorite" onClick={(event) => onFavoriteClick(event, props.image)}> ❤️ </button>
          <button className="watched" onClick={(event) => onWatchedClick(event, props.image)}> 👀 </button>
          {isClicked && (
              <Modal id={props.id} onClose={() => setSelectedMovie(null)} movieDetails={movieDetails} trailer={trailer_url}/>
          )}
      </span>
  );
}


export default MovieCard;
