// --- src/components/MovieCard.jsx ---
import React from 'react';

const MovieCard = ({ movie, onDelete }) => {
  return (
    <div className="movie-card">
      <div className="movie-header">
        <h3>🎬 {movie.title}</h3>
        <span className="movie-genre">{movie.genre}</span>
      </div>
      
      <div className="movie-body">
        <p className="movie-desc">
          <strong>📝 Description:</strong>
          {movie.description}
        </p>
      </div>
      
      {/* כפתור מחיקה - מוצג רק אם הפונקציה הועברה */}
      {onDelete && (
        <div className="card-actions">
          <button className="delete-btn" onClick={() => onDelete(movie._id)}>
            🗑 Delete Movie
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;