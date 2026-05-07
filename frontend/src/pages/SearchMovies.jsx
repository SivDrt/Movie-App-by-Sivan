import { useState } from 'react';
import MovieCard from '../components/MovieCard';

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    
    if (term === '') {
      setMovies([]);
      return;
    }

    fetch(`http://localhost:5001/movies/search?name=${term}`)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <input 
        type="text" 
        className="search-input" 
        placeholder="Type a movie name..." 
        onChange={handleSearch} 
      />
      
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;