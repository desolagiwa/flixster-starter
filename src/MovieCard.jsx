import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./MovieCard.css"
import Modal from "./Modal";
import { useState } from "react";

const MovieCard = (props) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

  const handleCardClick = () => {
    setSelectedMovie(props.id);
    setIsClicked(true);

    console.log(isClicked)
    console.log(props.id);
  };
  console.log(isClicked)

    return(
        <span className="card">
            <img className="image" src={`https://image.tmdb.org/t/p/w185${props.image}`} />
            <div className="title">{props.title}</div>
            <div className="rating">⭐️ {props.rating}</div>
            <button onClick={handleCardClick}>More Details</button>
            {selectedMovie === props.id && (
                <Modal id={props.id} onClose={() => setSelectedMovie(null)} isClicked={isClicked}/>
            )}
    {/* </div> */}
        </span>
    );
}


export default MovieCard;
