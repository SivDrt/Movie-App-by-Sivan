import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const generateAI = async () => {
    if (!title || !genre) {
      return alert('Please enter Title and Genre first to generate a description!');
    }
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/movies/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre })
      });
      const data = await response.json();
      setDescription(data.description);
    } catch (err) {
      console.error(err);
      alert('Error generating description');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = { title, genre, description };

    fetch('http://localhost:5001/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMovie)
    })
      .then(res => {
        if (res.ok) {
          alert('Movie added successfully!');
          navigate('/all-movies');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1>Add New Movie</h1>
        <p className="page-subtitle">Fill in the details to add a movie to your watchlist.</p>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Inception" />
          </div>
          
          <div className="input-group">
            <label>Genre</label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="e.g. Sci-Fi" />
          </div>
          
          <div className="input-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief summary of the movie..."></textarea>
          </div>

          <div className="form-actions" style={{ display: 'flex', gap: '15px' }}>
            <button type="button" onClick={generateAI} className="ai-btn" disabled={loading}>
              {loading ? 'Generating...' : '✨ Generate with AI'}
            </button>
            <button type="submit" className="submit-btn">➕ Add Movie</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;