import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const ScorePage = () => {
  const scores = useSelector(state => state.teams.scores);
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <div className="item-container">
      <h1>Game Scores</h1>
      <ul>
        {scores.map((team, index) => (
          <li key={team}>Team {index+1} <Badge bg="secondary">{team}</Badge></li>
        ))}
      </ul>
      <Button variant="primary" onClick={handleRestart} size="lg">Restart Game</Button>
    </div>
  );
};

export default ScorePage;
