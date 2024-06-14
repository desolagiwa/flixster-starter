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

  const handleCardClick = () => {
    setIsClicked(!isClicked);
    setSelectedMovie(props.id);

    console.log(isClicked)
    console.log(props.id);
  }


    useEffect(() => {
        console.log("in useEffect")
        fetchData();

    }, [isClicked]);



    const INFO_API_ENDPOINT = 'https://api.themoviedb.org/3/movie/'
    console.log("before fetch")
    console.log(`${INFO_API_ENDPOINT}${id}?language=en-US&api_key=${apiKey}`);

    const fetchData = async () => {
        try {

            console.log("in fatchData");

            const apiKey = import.meta.env.VITE_API_KEY;
            const url = `${INFO_API_ENDPOINT}${id}?language=en-US&api_key=${apiKey}`;
            console.log(url);
            const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            }
            });
            // console.log("Response:", response);
            if (!response.ok) {
            throw new Error('Failed to fetch movie details');
            }
            const data = await response.json();
            console.log("data", data);
            setMovieDetails(getMovieDetails(data));
            // console.log(movieDetails);

            console.log("data", data);
            setData(data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
        console.log("here")
    }
    console.log("after fetch")

    console.log(movieDetails);

    // movieDetails.genres is returning undefined, next issue to resolve

    // console.log(movieDetails.genres);
    // const function openModal(){

    // }



  return(
      <span className="card" onClick={handleCardClick}>
          <img className="image" src={`https://image.tmdb.org/t/p/w185${props.image}`} />
          <div className="title">{props.title}</div>
          <div className="rating">⭐️ {props.rating}</div>
          {/* <button onClick={handleCardClick}>More Details</button> */}
          {isClicked && (
              <Modal id={props.id} onClose={() => setSelectedMovie(null)} movieDetails={movieDetails}/>
          )}
  {/* </div> */}
      </span>
  );
}


export default MovieCard;
