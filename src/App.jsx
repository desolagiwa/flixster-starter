import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import MovieList from './MovieList'
import { render } from 'react-dom'

const App = () => {

const API_ENDPOINT = 'https://api.themoviedb.org/3/movie/now_playing';


const [movieData, setMovieData] = useState(null);

useEffect(() => {
const fetchData = async () => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(`${API_ENDPOINT}?language=en-US&page=1`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch movie data');
    }
    const data = await response.json();
    setMovieData(data);
  } catch (error) {
    console.error(error);
  }
  };

  fetchData();
});
  // console.log(movieData);


  return(
  <div className="App">
    <header className="App-header">Flixster</header>
    <main>
    {movieData === null ? (
        // Render a loading indicator or placeholder here
        <div>Loading...</div>
      ) : (
        <MovieList data={movieData}/>
      )}
    </main>
  </div>
  )
}

export default App
