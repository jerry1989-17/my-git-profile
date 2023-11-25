import React, { useState, useEffect } from 'react';

const UserProfile = ({ userData }) => (
  <div>
    <h2>{userData.login}</h2>
    <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
    <p>Followers: {userData.followers}</p>
    <p>Following: {userData.following}</p>
    <p>Repositories: {userData.public_repos}</p>
    <p>Location: {userData.location}</p>
    <p>Joined: {new Date(userData.created_at).toLocaleDateString()}</p>
    <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
      View on GitHub
    </a>
  </div>
);

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        throw new Error('User not found');
      }

      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (err) {
      setUserData(null);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>GitHub Profile Generator</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {userData && <UserProfile userData={userData} />}
    </div>
  );
};

export default App;
