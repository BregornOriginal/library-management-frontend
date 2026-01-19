import React, { useState } from 'react';
import { booksAPI } from '../services/api';
import './BookModal.css';

const AddBookModal = ({ onClose, onBookAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    total_copies: 1,
    available_copies: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('copies') ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await booksAPI.create(formData);
      onBookAdded();
    } catch (err) {
      console.error('Add book error:', err);
      setError(err.response?.data?.errors?.join(', ') || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✖</button>

        <div className="modal-header">
          <h2>➕ Add New Book</h2>
        </div>

        {error && (
          <div className="message error">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre *</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="isbn">ISBN *</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="total_copies">Total Copies *</label>
              <input
                type="number"
                id="total_copies"
                name="total_copies"
                value={formData.total_copies}
                onChange={handleChange}
                min="1"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="available_copies">Available Copies *</label>
              <input
                type="number"
                id="available_copies"
                name="available_copies"
                value={formData.available_copies}
                onChange={handleChange}
                min="0"
                max={formData.total_copies}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
