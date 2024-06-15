import React from "react";
import PropTypes from "prop-types";
import { getMovieDetails } from "./utils/utils";
import { useState } from "react";
import { useEffect } from "react";
import "./Modal.css"

const Modal = (props) =>{
    const TRAILER_API_ENDPOINT = 'https://api.themoviedb.org/3/movie/'
    const [data, setData] = useState(null);

    const backdropURL = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${props.movieDetails.backdrop_path}`
    return (
        <div className="modal" style={{backgroundImage: `url(${backdropURL})`}}>
            <div className="modal-content">
            <button onClick={props.onClose}>Close</button>
                <h2>{props.movieDetails.title}</h2>
                <p>Runtime: {props.movieDetails.runtime} minutes</p>
                <img src={`https://image.tmdb.org/t/p/w154${props.movieDetails.image}`} className="modal-img" alt={props.movieDetails.title} />
                <p>Release Date: {props.movieDetails.release_date}</p>
                <p>Genres: {props.movieDetails.genres.join(', ')}</p>
                <p>Overview: {props.movieDetails.overview}</p>
                <iframe width="200" height="150" src={props.trailer}></iframe>

            </div>
        </div>
    );

}

Modal.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
