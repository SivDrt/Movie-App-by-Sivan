const MovieCard = ({ movie, onDelete }) => {
  return (
    <div className="movie-card">
      <div className="movie-header">
        <h3>{movie.title}</h3>
        <span className="movie-genre">{movie.genre}</span>
      </div>
      <p className="movie-desc">{movie.description}</p>
      {/* מציגים את כפתור המחיקה רק אם הועברה פונקציית מחיקה (למשל, בעמוד החיפוש אין כפתור לפי ההוראות) */}
      {onDelete && (
        <button className="delete-btn" onClick={() => onDelete(movie._id)}>
          🗑 Delete Movie
        </button>
      )}
    </div>
  );
};

export default MovieCard;