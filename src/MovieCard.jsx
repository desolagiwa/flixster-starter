import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./MovieCard.css"

const MovieCard = (props) => {
    console.log(props);
    return(
        <span className="card">
            <img className="image" src={`https://image.tmdb.org/t/p/w185${props.image}`} />
            <div className="title">{props.title}</div>
            <div className="rating">⭐️ {props.rating}</div>
        </span>
    );
}

export default MovieCard;
