import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Books from './pages/Books';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Navigation Bar */}
          <nav className="navbar">
            <div className="nav-brand">
              <h2>📚 Middle-earth Library</h2>
            </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/books">Books</Link>
              <Link to="/login">Login</Link>
            </div>
          </nav>

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/books" element={<Books />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="footer">
            <p>Built with ❤️ and a love for Middle-earth</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
