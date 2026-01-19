import React, { useState } from 'react';
import { booksAPI, borrowingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import EditBookForm from './EditBookForm';
import './BookModal.css';

const BookModal = ({ book, onClose, onBookUpdated, onBookDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [borrowing, setBorrowing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const { isLibrarian, isMember } = useAuth();

  const handleBorrow = async () => {
    try {
      setBorrowing(true);
      setMessage({ type: '', text: '' });

      const response = await borrowingsAPI.create(book.id);
      console.log('Borrow response:', response);

      setMessage({
        type: 'success',
        text: '📚 Book borrowed successfully! Due in 2 weeks.'
      });

      setTimeout(() => {
        onBookUpdated();
      }, 1500);
    } catch (error) {
      console.error('Borrow error details:', error);
      console.error('Error response:', error.response);

      let errorMessage = 'Failed to borrow book.';

      if (error.response) {
        // Check different possible error formats from Rails
        if (error.response.data?.errors) {
          errorMessage = Array.isArray(error.response.data.errors)
            ? error.response.data.errors.join(', ')
            : error.response.data.errors;
        } else if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 403) {
          errorMessage = 'You do not have permission to borrow books.';
        } else if (error.response.status === 401) {
          errorMessage = 'Please log in to borrow books.';
        }
      }

      setMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setBorrowing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${book.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await booksAPI.delete(book.id);
      setMessage({
        type: 'success',
        text: '✓ Book deleted successfully!'
      });

      setTimeout(() => {
        onBookDeleted();
      }, 1000);
    } catch (error) {
      console.error('Delete error:', error);
      setMessage({
        type: 'error',
        text: 'Failed to delete book.'
      });
    }
  };

  if (isEditing) {
    return (
      <EditBookForm
        book={book}
        onClose={() => setIsEditing(false)}
        onBookUpdated={onBookUpdated}
      />
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✖</button>

        <div className="modal-header">
          <h2>{book.title}</h2>
          <div className={`availability-badge-large ${book.available_copies > 0 ? 'available' : 'unavailable'}`}>
            {book.available_copies > 0 ? '✓ Available' : '✗ Unavailable'}
          </div>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="modal-body">
          <div className="book-detail">
            <label>Author:</label>
            <p>{book.author}</p>
          </div>

          <div className="book-detail">
            <label>Genre:</label>
            <p>{book.genre}</p>
          </div>

          <div className="book-detail">
            <label>ISBN:</label>
            <p>{book.isbn}</p>
          </div>

          <div className="book-detail">
            <label>Availability:</label>
            <p>
              <strong>{book.available_copies}</strong> of <strong>{book.total_copies}</strong> copies available
            </p>
          </div>
        </div>

        <div className="modal-footer">
          {isMember() && book.available_copies > 0 && (
            <button
              className="btn btn-borrow"
              onClick={handleBorrow}
              disabled={borrowing}
            >
              {borrowing ? 'Borrowing...' : '📚 Borrow This Book'}
            </button>
          )}

          {isLibrarian() && (
            <div className="librarian-actions">
              <button
                className="btn btn-edit"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={handleDelete}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookModal;
