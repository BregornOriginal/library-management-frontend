import React from 'react';

const Home = () => {
  return (
    <div className="home-page">
      <h1>🧙‍♂️ Welcome to the Middle-earth Library 📚</h1>
      <p>Your gateway to the greatest collection of tales and wisdom!</p>
      <div className="info-box">
        <h2>What can you do here?</h2>
        <ul>
          <li>📖 Browse our collection of books</li>
          <li>🔍 Search for your favorite titles</li>
          <li>📚 Borrow books (Members)</li>
          <li>📊 View your reading dashboard</li>
          <li>⚙️ Manage the library (Librarians)</li>
        </ul>
      </div>
      <p className="quote">
        <em>"All we have to decide is what to do with the time that is given us."</em>
        <br />
        - Gandalf the Grey
      </p>
    </div>
  );
};

export default Home;
