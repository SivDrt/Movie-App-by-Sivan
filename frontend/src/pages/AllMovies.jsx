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
    <div className="page-wrapper">
      <header className="page-header">
        <h1>All Movies</h1>
        <p className="page-subtitle">You have {movies.length} movies in yourcollection</p>
      </header>
      
      <section className="movies-container">
        {movies.length > 0 ? (
          <div className="movies-grid">
            {movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onDelete={deleteMovie} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Your watchlist is empty. Start by adding some movies! 🍿</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllMovies;