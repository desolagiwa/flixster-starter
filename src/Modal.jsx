import React from "react";
import PropTypes from "prop-types";
import { getMovieDetails } from "./utils/utils";
import { useState } from "react";
import { useEffect } from "react";

const Modal = (props) =>{
    const id = props.id;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
    //     fetchData();
    //     console.log("in useEffect")
    //   }, [id]);
        if (props.isClicked) {
            fetchData();
        }
        }, [props.isClicked]);

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
            console.log("Response:", response);
            if (!response.ok) {
            throw new Error('Failed to fetch movie details');
            }
            const data = await response.json();
            console.log("data", data);
            setData(data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
        // console.log("here")
    }
    console.log("after fetch")

    const movieDetails = getMovieDetails(data);

    // console.log(movieDetails);

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{movieDetails.title}</h2>
                <p>Runtime: {movieDetails.runtime} minutes</p>
                <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
                <p>Release Date: {movieDetails.release_date}</p>
                <p>Genres: {movieDetails.genres.join(', ')}</p>
                <p>Overview: {movieDetails.overview}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );

}

Modal.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
