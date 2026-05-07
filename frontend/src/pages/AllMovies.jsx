import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const AllMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));
  }, []);

  const deleteMovie = (id) => {
    fetch(`http://localhost:5001/movies/${id}`, { method: 'DELETE' })
      .then(() => {
        setMovies(movies.filter(movie => movie._id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>All Movies</h1>
      <p>{movies.length} movies in your watchlist</p>
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onDelete={deleteMovie} />
        ))}
      </div>
    </div>
  );
};

export default AllMovies;