import React, { useState } from 'react';
import { borrowingsAPI } from '../services/api';
import './MemberDashboard.css';

const MemberDashboard = ({ data, onRefresh }) => {
  const { borrowed_books, overdue_books } = data;
  const [returning, setReturning] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleReturn = async (borrowingId) => {
    try {
      setReturning(prev => ({ ...prev, [borrowingId]: true }));
      setMessage({ type: '', text: '' });

      await borrowingsAPI.returnBook(borrowingId);

      setMessage({
        type: 'success',
        text: '✓ Book returned successfully!'
      });

      // Refresh dashboard after a short delay
      setTimeout(() => {
        onRefresh();
        setMessage({ type: '', text: '' });
      }, 1500);
    } catch (error) {
      console.error('Return error:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.errors?.[0] || 'Failed to return book.'
      });
    } finally {
      setReturning(prev => ({ ...prev, [borrowingId]: false }));
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const getDaysRemaining = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="member-dashboard">
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Stats Summary */}
      <div className="stats-summary">
        <div className="summary-card active">
          <div className="summary-icon">📚</div>
          <div className="summary-content">
            <h3>{borrowed_books?.length || 0}</h3>
            <p>Books Borrowed</p>
          </div>
        </div>

        <div className="summary-card overdue">
          <div className="summary-icon">⚠️</div>
          <div className="summary-content">
            <h3>{overdue_books?.length || 0}</h3>
            <p>Overdue Books</p>
          </div>
        </div>
      </div>

      {/* Borrowed Books Section */}
      {borrowed_books && borrowed_books.length > 0 ? (
        <div className="section">
          <div className="section-header">
            <h2>📖 Your Borrowed Books</h2>
            <button className="btn-refresh" onClick={onRefresh}>
              🔄 Refresh
            </button>
          </div>

          <div className="borrowed-books-grid">
            {borrowed_books.map((borrowing) => {
              const daysRemaining = getDaysRemaining(borrowing.due_date);
              const overdueStatus = isOverdue(borrowing.due_date);

              return (
                <div
                  key={borrowing.id}
                  className={`borrowed-book-card ${overdueStatus ? 'overdue' : ''}`}
                >
                  <div className="book-card-header">
                    <h3>{borrowing.book_title}</h3>
                    {overdueStatus && (
                      <span className="overdue-tag">⚠️ OVERDUE</span>
                    )}
                  </div>

                  <div className="book-card-body">
                    <p className="book-info">
                      <strong>Author:</strong> {borrowing.book_author}
                    </p>
                    <p className="book-info">
                      <strong>Borrowed:</strong> {new Date(borrowing.borrowed_at).toLocaleDateString()}
                    </p>
                    <p className="book-info">
                      <strong>Due Date:</strong> {new Date(borrowing.due_date).toLocaleDateString()}
                    </p>

                    <div className={`due-status ${overdueStatus ? 'overdue' : daysRemaining <= 3 ? 'warning' : 'good'}`}>
                      {overdueStatus ? (
                        <span>⚠️ {Math.abs(daysRemaining)} days overdue</span>
                      ) : daysRemaining === 0 ? (
                        <span>📅 Due today!</span>
                      ) : daysRemaining === 1 ? (
                        <span>📅 Due tomorrow</span>
                      ) : (
                        <span>📅 {daysRemaining} days remaining</span>
                      )}
                    </div>
                  </div>

                  <div className="book-card-footer">
                    <button
                      className="btn-return"
                      onClick={() => handleReturn(borrowing.id)}
                      disabled={returning[borrowing.id]}
                    >
                      {returning[borrowing.id] ? 'Returning...' : '↩️ Return Book'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="section no-books">
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No borrowed books</h3>
            <p>You haven't borrowed any books yet. Time to start your adventure!</p>
            <button
              className="btn-browse"
              onClick={() => window.location.href = '/books'}
            >
              📖 Browse Books
            </button>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="section tips-section">
        <h2>💡 Tips</h2>
        <ul className="tips-list">
          <li>📅 Books are due 2 weeks after borrowing</li>
          <li>⚠️ Return books on time to avoid overdue status</li>
          <li>📚 You can borrow multiple books at once</li>
          <li>🔍 Use the search feature to find specific books</li>
        </ul>
      </div>
    </div>
  );
};

export default MemberDashboard;
