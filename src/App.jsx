import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import MovieList from './MovieList'
import { render } from 'react-dom'
import { concatData } from './utils/utils'
import { sortData } from './utils/utils'

const App = () => {

  const API_ENDPOINT = 'https://api.themoviedb.org/3/movie/now_playing';
  const SEARCH_API_ENDPOINT = "https://api.themoviedb.org/3/search/movie";


  const [movieData, setMovieData] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showNowPlaying, setShowNowPlaying] = useState(true);
  const [filter, setFilter] = useState('');




  const fetchData = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      let url = `${API_ENDPOINT}?language=en-US&page=1`;
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
      // const combinedData = concatData(movieData, data);
      // setMovieData(combinedData);
      const sortedData = sortData(data, filter);
      console.log("sorted data: ",sortedData);
      setMovieData(sortedData);
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
        // setSearchData(data);
        const sortedData = sortData(data, filter);
        setSearchData(sortedData);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
  };

  const fetchMoreData = async () => {
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
      // setMovieData(combinedData);
      const sortedData = sortData(combinedData, filter);
      console.log("sorted data: ",sortedData);
      setMovieData(sortedData);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }


  useEffect(() => {
    fetchMoreData();
  }, [page]);

  useEffect(() => {
    fetchSearchData();
  }, [searchQuery, page]);

  useEffect(() => {
    setMovieData(null);
    fetchData();
  }, [filter, page]);

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    console.log("filter: ", event.target.value);
  };

  const handleSearchClick = () => {
    setShowSearchBar(true);
    setShowNowPlaying(false);
  };
  const handleLoadMore = () => {
    setPage(page => page + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🍿 Flixster 🎥</h1>
        <nav>
          <button onClick={handleNowPlayingClick}>Now Playing</button>
          <button onClick={handleSearchClick}>Search</button>
        </nav>
        <select onChange={handleFilterChange} value={filter}>
          <option value="">Select a filter</option>
          <option value="release_date">Release Date</option>
          <option value="rating">Rating</option>
          <option value="popularity">Popularity</option>
      </select>
      </header>
      <main>
        {showSearchBar ? (
          <>
            <form onSubmit={handleSearchSubmit}>
              <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search" />
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
                <button onClick={() => setPage(page => page + 1)}>Load More</button></>
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
