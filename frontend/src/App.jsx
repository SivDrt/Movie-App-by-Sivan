import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import AllMovies from './pages/AllMovies';
import AddMovie from './pages/AddMovie';
import SearchMovies from './pages/SearchMovies';

function App() {
  return (
    <div className="app-container">
      {/* תפריט צד */}
      <nav className="sidebar">
        <h2>🎬 Watchlist</h2>
        <NavLink to="/all-movies" className="nav-link">🗂 All Movies</NavLink>
        <NavLink to="/add-movie" className="nav-link">➕ Add New Movie</NavLink>
        <NavLink to="/search-movies" className="nav-link">🔍 Search Movie</NavLink>
      </nav>

      {/* אזור התוכן המרכזי שמשתנה לפי הראוטר */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/all-movies" />} />
          <Route path="/all-movies" element={<AllMovies />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/search-movies" element={<SearchMovies />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;