import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ולידציות לפי דרישות המבחן
    if (title.length < 1 || title.length > 20) return alert('Title must be between 1 and 20 characters.');
    if (genre.length < 1) return alert('Genre is required.');
    if (description.length > 200) return alert('Description cannot exceed 200 characters.');

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
        } else {
          alert('Failed to add movie.');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Add New Movie</h1>
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
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Movie description..."></textarea>
          </div>
          <button type="submit" className="submit-btn">Add Movie</button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;