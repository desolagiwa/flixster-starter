import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import MovieList from './MovieList'
import { render } from 'react-dom'
import { concatData } from './utils/utils'

const App = () => {

  const API_ENDPOINT = 'https://api.themoviedb.org/3/movie/now_playing';
  const SEARCH_API_ENDPOINT =  "https://api.themoviedb.org/3/search/movie";


  const [movieData, setMovieData] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showNowPlaying, setShowNowPlaying] = useState(true);




  const fetchData = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      let url = `${API_ENDPOINT}?language=en-US&page=${page}`;
      if (searchQuery !== '') {
        url += `&query=${searchQuery}`;
      }
      const response = await fetch(url, {
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
      const combinedData = concatData(movieData, data);
      setMovieData(combinedData);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    };

    const fetchSearchData = async () => {
      if (searchQuery !== '') {
        try {
          const apiKey = import.meta.env.VITE_API_KEY;
          const url = `${SEARCH_API_ENDPOINT}?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`;
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch search data');
          }
          const data = await response.json();
          setSearchData(data);
          setError(null);
        } catch (error) {
          console.error(error);
          setError(error.message);
        }
      }
    };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchSearchData();
  }, [searchQuery, page]);

    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
      event.preventDefault();
      setPage(1);
      setMovieData(null);
      setError(null);
      fetchData();
    };

    const handleNowPlayingClick = () => {
      setShowSearchBar(false);
      setShowNowPlaying(true);
      fetchData();
    };

    const handleSearchClick = () => {
      setShowSearchBar(true);
      setShowNowPlaying(false);
    };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
        <nav>
          <button onClick={handleNowPlayingClick}>Now Playing</button>
          <button onClick={handleSearchClick}>Search</button>
        </nav>
      </header>
      <main>
        {showSearchBar ? (
          <>
            <form onSubmit={handleSearchSubmit}>
              <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search"/>
              <button type="submit">Search</button>
            </form>
            {searchData ? (
              <MovieList data={searchData} />
            ) : (
              <MovieList data={movieData} />
            )}
          </>
        ) : (
          <>
            {movieData !== null ? (
              <>
              <MovieList data={movieData} />
              <button onClick={() => setPage(page + 1)}>Load More</button></>
            ) : (
              <div>Loading...</div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App
