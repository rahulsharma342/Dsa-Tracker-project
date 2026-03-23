import React, { useState } from "react";
import { useProgress } from "../hooks/useProgress";
import "../styles/dashboard.css";

const Dashboard = () => {
  const {
    stats,
    progress,
    topicWise,
    dailyProgress,
    loading,
    error,
    totalAttempts,
    totalTimeSpent,
    averageTimePerProblem,
    solvedProblems,
    unsolvedProblems,
    topicStats,
    difficultyStats,
  } = useProgress();

  const [filterDifficulty, setFilterDifficulty] = useState("all");

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your progress...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>⚠️ Error Loading Dashboard</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Filter progress based on difficulty
  const filteredProgress =
    filterDifficulty === "all"
      ? progress
      : progress.filter((p) => p.difficulty === filterDifficulty);

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <header className="dashboard-header">
          <h1>📊 Your Progress Dashboard</h1>
          <p>Track your DSA journey and celebrate your growth</p>
        </header>

      {/* Stats Overview Section */}
      <section className="stats-overview">
        <div className="stat-card primary">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>Total Solved</h3>
            <p className="stat-value">{solvedProblems}</p>
            <span className="stat-subtitle">problems solved</span>
          </div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Current Streak</h3>
            <p className="stat-value">{stats?.streak || 0}</p>
            <span className="stat-subtitle">days in a row</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>Total Time</h3>
            <p className="stat-value">{totalTimeSpent}</p>
            <span className="stat-subtitle">minutes spent</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>Avg Time/Problem</h3>
            <p className="stat-value">{averageTimePerProblem}</p>
            <span className="stat-subtitle">minutes</span>
          </div>
        </div>
      </section>

      {/* Difficulty Distribution */}
      <section className="difficulty-section">
        <h2>📊 Difficulty Distribution</h2>
        <div className="difficulty-cards">
          <div className="difficulty-card easy">
            <div className="difficulty-icon">✅</div>
            <h3>Easy</h3>
            <p className="difficulty-count">{stats?.difficulty?.easy || 0}</p>
            <span>solved</span>
          </div>

          <div className="difficulty-card medium">
            <div className="difficulty-icon">⚡</div>
            <h3>Medium</h3>
            <p className="difficulty-count">{stats?.difficulty?.medium || 0}</p>
            <span>solved</span>
          </div>

          <div className="difficulty-card hard">
            <div className="difficulty-icon">💪</div>
            <h3>Hard</h3>
            <p className="difficulty-count">{stats?.difficulty?.hard || 0}</p>
            <span>solved</span>
          </div>

          <div className="difficulty-card unsolved">
            <div className="difficulty-icon">🔲</div>
            <h3>Unsolved</h3>
            <p className="difficulty-count">{unsolvedProblems}</p>
            <span>to do</span>
          </div>
        </div>
      </section>

      {/* Topic-wise Progress */}
      <section className="topics-section">
        <h2>📚 Topic-wise Progress</h2>
        <div className="topics-grid">
          {Object.entries(topicStats).length > 0 ? (
            Object.entries(topicStats).map(([topic, data]) => (
              <div key={topic} className="topic-card">
                <h3>{topic}</h3>
                <div className="topic-stats">
                  <div className="topic-stat">
                    <span className="topic-label">Solved:</span>
                    <span className="topic-value solved">{data.solved}</span>
                  </div>
                  <div className="topic-stat">
                    <span className="topic-label">Total:</span>
                    <span className="topic-value">{data.total}</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(data.solved / data.total) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="topic-percentage">
                  {Math.round((data.solved / data.total) * 100)}% Complete
                </p>
              </div>
            ))
          ) : (
            <div className="no-data">No topic data yet</div>
          )}
        </div>
      </section>

      {/* Daily Progress Chart Section */}
      <section className="daily-section">
        <h2>📅 Last 7 Days Activity</h2>
        <div className="daily-chart">
          {dailyProgress && dailyProgress.length > 0 ? (
            <div className="chart-bars">
              {dailyProgress.map((day, index) => (
                <div key={index} className="chart-bar">
                  <div className="bar">
                    <div
                      className="bar-fill"
                      style={{
                        height: `${Math.min(day.count * 20, 100)}%`,
                      }}
                      title={`${day.count} problems on ${day._id}`}
                    ></div>
                  </div>
                  <span className="bar-label">{day._id}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">No activity in the last 7 days</div>
          )}
        </div>
      </section>

      {/* Problems List Section */}
      <section className="problems-section">
        <div className="problems-header">
          <h2>🔍 Your Progress</h2>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filterDifficulty === "all" ? "active" : ""}`}
              onClick={() => setFilterDifficulty("all")}
            >
              All ({progress.length})
            </button>
            <button
              className={`filter-btn ${filterDifficulty === "Easy" ? "active" : ""}`}
              onClick={() => setFilterDifficulty("Easy")}
            >
              Easy ({difficultyStats.Easy})
            </button>
            <button
              className={`filter-btn ${filterDifficulty === "Medium" ? "active" : ""}`}
              onClick={() => setFilterDifficulty("Medium")}
            >
              Medium ({difficultyStats.Medium})
            </button>
            <button
              className={`filter-btn ${filterDifficulty === "Hard" ? "active" : ""}`}
              onClick={() => setFilterDifficulty("Hard")}
            >
              Hard ({difficultyStats.Hard})
            </button>
          </div>
        </div>

        <div className="problems-table">
          {filteredProgress.length > 0 ? (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Topic</th>
                    <th>Difficulty</th>
                    <th>Status</th>
                    <th>Attempts</th>
                    <th>Time Spent</th>
                    <th>Last Attempted</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProgress.map((p) => (
                    <tr key={p._id} className={`status-${p.status}`}>
                      <td className="problem-name">
                        {p.problem?.title || "Unknown Problem"}
                      </td>
                      <td>{p.topic}</td>
                      <td>
                        <span className={`difficulty-badge ${p.difficulty.toLowerCase()}`}>
                          {p.difficulty}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${p.status}`}>
                          {p.status === "solved" ? "✓ Solved" : "○ Unsolved"}
                        </span>
                      </td>
                      <td className="center">{p.attempts}</td>
                      <td className="center">{p.timeSpent} min</td>
                      <td className="center">
                        {p.lastAttemptedAt
                          ? new Date(p.lastAttemptedAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data">
              No problems yet. Start solving to see your progress!
            </div>
          )}
        </div>
      </section>

      {/* Summary Statistics */}
      <section className="summary-section">
        <h2>📋 Summary Statistics</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Total Attempts:</span>
            <span className="summary-value">{totalAttempts}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Solved Problems:</span>
            <span className="summary-value">{solvedProblems}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Unsolved Problems:</span>
            <span className="summary-value">{unsolvedProblems}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Success Rate:</span>
            <span className="summary-value">
              {progress.length > 0
                ? Math.round((solvedProblems / progress.length) * 100)
                : 0}
              %
            </span>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Dashboard;
