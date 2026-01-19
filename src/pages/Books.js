import React, { useState, useEffect } from 'react';
import { booksAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import AddBookModal from '../components/AddBookModal';
import SearchBar from '../components/SearchBar';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchParams, setSearchParams] = useState({ search: '', search_by: '' });

  const { isLibrarian } = useAuth();

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await booksAPI.getAll(searchParams);
      setBooks(response.data);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = (search, searchBy) => {
    setSearchParams({ search, search_by: searchBy });
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleBookAdded = () => {
    setShowAddModal(false);
    fetchBooks();
  };

  const handleBookUpdated = () => {
    setSelectedBook(null);
    fetchBooks();
  };

  const handleBookDeleted = () => {
    setSelectedBook(null);
    fetchBooks();
  };

  if (loading) {
    return (
      <div className="books-page">
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading the treasures of Middle-earth...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="books-page">
      <div className="books-header">
        <h1>📖 Books Collection</h1>
        <p>Explore the wisdom of Middle-earth and beyond</p>
      </div>

      <div className="books-controls">
        <SearchBar onSearch={handleSearch} />

        {isLibrarian() && (
          <button
            className="btn btn-add"
            onClick={() => setShowAddModal(true)}
          >
            ➕ Add New Book
          </button>
        )}
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {books.length === 0 ? (
        <div className="no-books">
          <p>📚 No books found. {isLibrarian() && "Add your first book to get started!"}</p>
        </div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => handleBookClick(book)}
            />
          ))}
        </div>
      )}

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleCloseModal}
          onBookUpdated={handleBookUpdated}
          onBookDeleted={handleBookDeleted}
        />
      )}

      {showAddModal && (
        <AddBookModal
          onClose={() => setShowAddModal(false)}
          onBookAdded={handleBookAdded}
        />
      )}
    </div>
  );
};

export default Books;
