import React, { useEffect, useState } from 'react';
import '../css/MiniLeaderboard.css';
/*
import React, { useEffect, useState } from 'react';
import '../css/MiniLeaderboard.css';

const MiniLeaderboard = () => {
  const [miniLeaderboardData, setMiniLeaderboardData] = useState([]);

  // Mock data for testing (Top 10 players)
  const mockData = [
    { name: "Alice", score: 150 },
    { name: "Bob", score: 120 },
    { name: "Charlie", score: 100 },
    { name: "Dave", score: 80 },
    { name: "Eve", score: 70 },
    { name: "Frank", score: 60 },
    { name: "Grace", score: 50 },
    { name: "Hank", score: 40 },
    { name: "Ivy", score: 30 },
    { name: "Jack", score: 20 },
  ];

  useEffect(() => {
    // Simulate fetching data on component load
    fetchMiniLeaderboardData();
  }, []);

  const fetchMiniLeaderboardData = () => {
    // Simulate API call with mock data
    const rankedData = mockData.map((player, index) => ({
      ...player,
      originalRank: index + 1,
    }));
    setMiniLeaderboardData(rankedData);
  };

  return (
    <div className="mini-leaderboard-component">
      <h3 className="mini-leaderboard-title">Top 10 Players</h3>
      <div className="mini-leaderboard-list">
        {miniLeaderboardData.length > 0 ? (
          miniLeaderboardData.map((player) => (
            <div
              key={player.name}
              className={`mini-leaderboard-item ${player.originalRank <= 3 ? 'top-three' : ''}`}
            >
              <span className="rank">
                {player.originalRank <= 3 ? (
                  <span className={`medal medal-${player.originalRank}`}>
                    {player.originalRank === 1 ? '🥇' : player.originalRank === 2 ? '🥈' : '🥉'}
                  </span>
                ) : (
                  player.originalRank
                )}
              </span>
              <span className="name">{player.name}</span>
              <span className="score">{player.score}</span>
            </div>
          ))
        ) : (
          <p className="no-players">No players found.</p>
        )}
      </div>
    </div>
  );
};

export default MiniLeaderboard;
*/




const MiniLeaderboard = () => {
  const [miniLeaderboardData, setMiniLeaderboardData] = useState([]);

  useEffect(() => {
    fetchMiniLeaderboardData();
  }, []);

  const fetchMiniLeaderboardData = async () => {
    try {
      const response = await fetch(`/api/leaderboard?limit=10`); // Fetch top 10 players
      const data = await response.json();
      const rankedData = data.map((player, index) => ({ ...player, originalRank: index + 1 }));
      setMiniLeaderboardData(rankedData);
    } catch (error) {
      console.error('Error fetching mini leaderboard:', error);
      setMiniLeaderboardData([]); // Clear leaderboard on error
    }
  };

  return (
    <div className="mini-leaderboard-component">
      <h3 className="mini-leaderboard-title">Top 10 Players</h3>
      <div className="mini-leaderboard-list">
        {miniLeaderboardData.length > 0 ? (
          miniLeaderboardData.map((player) => (
            <div
              key={player.name}
              className={`mini-leaderboard-item ${player.originalRank <= 3 ? 'top-three' : ''}`}
            >
              <span className="rank">
                {player.originalRank <= 3 ? (
                  <span className={`medal medal-${player.originalRank}`}>
                    {player.originalRank === 1 ? '🥇' : player.originalRank === 2 ? '🥈' : '🥉'}
                  </span>
                ) : (
                  player.originalRank
                )}
              </span>
              <span className="name">{player.name}</span>
              <span className="score">{player.score}</span>
            </div>
          ))
        ) : (
          <p className="no-players">No players found.</p> //change here Messing up naming conventions with <p>
        )}
      </div>
    </div>
  );
};

export default MiniLeaderboard;