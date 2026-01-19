import React from 'react';
import './BookCard.css';

const BookCard = ({ book, onClick }) => {
  const isAvailable = book.available_copies > 0;

  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-card-header">
        <h3 className="book-title">{book.title}</h3>
        <div className={`availability-badge ${isAvailable ? 'available' : 'unavailable'}`}>
          {isAvailable ? '✓ Available' : '✗ Unavailable'}
        </div>
      </div>

      <div className="book-card-body">
        <p className="book-author">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="book-genre">
          <strong>Genre:</strong> {book.genre}
        </p>
        <p className="book-isbn">
          <strong>ISBN:</strong> {book.isbn}
        </p>
      </div>

      <div className="book-card-footer">
        <div className="copies-info">
          <span className="copies-available">
            📚 {book.available_copies} / {book.total_copies} available
          </span>
        </div>
        <button className="btn-view">View Details →</button>
      </div>
    </div>
  );
};

export default BookCard;
