import React, { useEffect, useState } from 'react';
import '../css/Leaderboard.css';

// const Leaderboard = () => {
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const [viewMode, setViewMode] = useState('top10');
//   const [searchInput, setSearchInput] = useState('');

//   useEffect(() => {
//     if (!searchInput) {
//       fetchLeaderboardData(viewMode);
//     }
//   }, [viewMode]);

//   const fetchLeaderboardData = async (mode) => {
//     try {
//       const limit = mode === 'top10' ? 10 : mode === 'top100' ? 100 : 500;
//       const response = await fetch(`/api/leaderboard?limit=${limit}`); // Replace with actual API endpoint
//       const data = await response.json();
//       const rankedData = data.map((player, index) => ({ ...player, originalRank: index + 1 }));
//       setLeaderboardData(rankedData);
//     } catch (error) {
//       console.error('Error fetching leaderboard:', error);
//       setLeaderboardData([]); // Clear leaderboard on error
//     }
//   };

//   const handleSearch = async () => {
//     if (searchInput) {
//       try {
//         const response = await fetch(`/api/player/${searchInput}`); // Replace with actual API endpoint
//         const data = await response.json();
//         const rank = leaderboardData.findIndex(p => p.name === data.name) + 1 || 1;
//         setLeaderboardData([{ ...data, originalRank: rank }]);
//       } catch (error) {
//         console.error('Error searching player:', error);
//         setLeaderboardData([]); // Clear leaderboard on error
//       }
//     } else {
//       fetchLeaderboardData(viewMode);
//     }
//   };

//   return (
//     <div className="leaderboard-component">
//       <div className="leaderboard-container">
//         <div className="leaderboard-controls">
//           <button
//             className={`view-btn ${viewMode === 'top10' ? 'active' : ''}`}
//             onClick={() => setViewMode('top10')}
//           >
//             Top 10
//           </button>
//           <button
//             className={`view-btn ${viewMode === 'top100' ? 'active' : ''}`}
//             onClick={() => setViewMode('top100')}
//           >
//             Top 100
//           </button>
//           <button
//             className={`view-btn ${viewMode === 'top500' ? 'active' : ''}`}
//             onClick={() => setViewMode('top500')}
//           >
//             Top 500
//           </button>
//           <input
//             type="text"
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             placeholder="Search Player"
//             className="search-input"
//           />
//           <button onClick={handleSearch} className="search-btn">Search</button>
//         </div>

//         <div className="leaderboard-list">
//           {leaderboardData.length > 0 ? (
//             leaderboardData.map((player) => (
//               <div
//                 key={player.name}
//                 className={`leaderboard-item ${player.originalRank <= 3 ? 'top-three' : ''}`}
//               >
//                 <span className="rank">
//                   {player.originalRank <= 3 ? (
//                     <span className={`medal medal-${player.originalRank}`}>
//                       {player.originalRank === 1 ? '🥇' : player.originalRank === 2 ? '🥈' : '🥉'}
//                     </span>
//                   ) : (
//                     player.originalRank
//                   )}
//                 </span>
//                 <span className="name">{player.name}</span>
//                 <span className="score">{player.score}</span>
//               </div>
//             ))
//           ) : (
//             <p className="no-players">No players found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };



const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [viewMode, setViewMode] = useState('top10');
  const [searchInput, setSearchInput] = useState('');

  // Mock data for testing
  const mockData = [
    { name: "Alice", score: 150, originalRank: 1 },
    { name: "Bob", score: 120, originalRank: 2 },
    { name: "Charlie", score: 100, originalRank: 3 },
    { name: "Dave", score: 80, originalRank: 4 },
    { name: "Eve", score: 70, originalRank: 5 },
    { name: "Frank", score: 60, originalRank: 6 },
    { name: "Grace", score: 50, originalRank: 7 },
    { name: "Hank", score: 40, originalRank: 8 },
    { name: "Ivy", score: 30, originalRank: 9 },
    { name: "Jack", score: 20, originalRank: 10 },
  ];

  useEffect(() => {
    // Populate leaderboard with mock data on initial load
    if (!searchInput) {
      fetchLeaderboardData(viewMode);
    }
  }, [viewMode]);

  const fetchLeaderboardData = async (mode) => {
    try {
      const limit = mode === 'top10' ? 10 : mode === 'top100' ? 100 : 500;
      // Simulate API call with mock data
      const data = mockData.slice(0, limit);
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLeaderboardData([]); // Clear leaderboard on error
    }
  };

  const handleSearch = async () => {
    if (searchInput) {
      try {
        // Simulate search functionality with mock data
        const filtered = mockData.filter(player =>
          player.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setLeaderboardData(filtered.length ? filtered : []);
      } catch (error) {
        console.error('Error searching player:', error);
        setLeaderboardData([]);
      }
    } else {
      fetchLeaderboardData(viewMode);
    }
  };

  return (
    <div className="leaderboard-component">
      <div className="leaderboard-container">
        <div className="leaderboard-controls">
          <button
            className={`view-btn ${viewMode === 'top10' ? 'active' : ''}`}
            onClick={() => setViewMode('top10')}
          >
            Top 10
          </button>
          <button
            className={`view-btn ${viewMode === 'top100' ? 'active' : ''}`}
            onClick={() => setViewMode('top100')}
          >
            Top 100
          </button>
          <button
            className={`view-btn ${viewMode === 'top500' ? 'active' : ''}`}
            onClick={() => setViewMode('top500')}
          >
            Top 500
          </button>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Player"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">Search</button>
        </div>

        <div className="leaderboard-list">
          {leaderboardData.length > 0 ? (
            leaderboardData.map((player) => (
              <div
                key={player.name}
                className={`leaderboard-item ${player.originalRank <= 3 ? 'top-three' : ''}`}
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
    </div>
  );
};

export default Leaderboard; 