import React from 'react';
import './LibrarianDashboard.css';

const LibrarianDashboard = ({ data, onRefresh }) => {
  const { total_books, total_borrowed_books, books_due_today, overdue_books } = data;

  return (
    <div className="librarian-dashboard">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card books">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{total_books}</h3>
            <p>Total Books</p>
          </div>
        </div>

        <div className="stat-card borrowed">
          <div className="stat-icon">📖</div>
          <div className="stat-content">
            <h3>{total_borrowed_books}</h3>
            <p>Currently Borrowed</p>
          </div>
        </div>

        <div className="stat-card due-today">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{books_due_today}</h3>
            <p>Due Today</p>
          </div>
        </div>

        <div className="stat-card overdue">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>{overdue_books?.length || 0}</h3>
            <p>Overdue Books</p>
          </div>
        </div>
      </div>

      {/* Overdue Books Section */}
      {overdue_books && overdue_books.length > 0 && (
        <div className="section overdue-section">
          <div className="section-header">
            <h2>⚠️ Overdue Books</h2>
            <button className="btn-refresh" onClick={onRefresh}>
              🔄 Refresh
            </button>
          </div>
          <div className="overdue-table-container">
            <table className="overdue-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Book Title</th>
                  <th>Due Date</th>
                  <th>Days Overdue</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {overdue_books.map((borrowing) => (
                  <tr key={borrowing.id}>
                    <td className="member-name">{borrowing.user_name}</td>
                    <td className="book-title">{borrowing.book_title}</td>
                    <td>{new Date(borrowing.due_date).toLocaleDateString()}</td>
                    <td className="days-overdue">
                      <span className="overdue-badge">{borrowing.days_overdue} days</span>
                    </td>
                    <td className="member-email">{borrowing.user_email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {overdue_books && overdue_books.length === 0 && (
        <div className="section no-overdue">
          <div className="empty-state">
            <div className="empty-icon">✅</div>
            <h3>All books are on time!</h3>
            <p>No overdue books at the moment. The Fellowship is responsible! 🎉</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="section quick-actions">
        <h2>⚡ Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => window.location.href = '/books'}>
            📚 Manage Books
          </button>
          <button className="action-btn" onClick={onRefresh}>
            🔄 Refresh Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
