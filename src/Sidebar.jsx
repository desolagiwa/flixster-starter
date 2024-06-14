import React from "react";
import { useState } from "react";
import "./Sidebar.css";

const Sidebar = (props) => {
  return (
    <>
    <span className="sidebar">
      <div className="side-cont">
        <h2>Favorites</h2>
      <div className="post-cont">
        {Array.from(props.favoriteMovies).map((movie) => (
          <img src={`https://image.tmdb.org/t/p/w92${movie}`}/>
        ))}
      </div>
      <h2>Watched</h2>
      <div className="post-cont">
        {Array.from(props.watchedMovies).map((movie) => (
          <img src={`https://image.tmdb.org/t/p/w92${movie}`}/>
        ))}
      </div></div>
    </span>
    </>
  );
};

export default Sidebar;
