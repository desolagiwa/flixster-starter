import React from "react";
import PropTypes from "prop-types";
import { getMovieDetails } from "./utils/utils";
import { useState } from "react";
import { useEffect } from "react";
import "./Modal.css"

const Modal = (props) =>{
    console.log(props.movieDetails);
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{props.movieDetails.title}</h2>
                <p>Runtime: {props.movieDetails.runtime} minutes</p>
                <img src={`https://image.tmdb.org/t/p/w154${props.movieDetails.image}`} alt={props.movieDetails.title} />
                <p>Release Date: {props.movieDetails.release_date}</p>
                {/* <p>Genres: {movieDetails.genres.join(', ')}</p> */}
                <p>Overview: {props.movieDetails.overview}</p>
                <button onClick={props.onClose}>Close</button>
            </div>
        </div>
    );

}

Modal.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
