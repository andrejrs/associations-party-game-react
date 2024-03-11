import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTermsForPlayer } from '../features/teams/teamsSlice';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

const TermsInputPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const numberOfTermsPerPlayer = useSelector(state => state.teams.numberOfTermsPerPlayer);
  const players = useSelector(state => state.teams.players);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [terms, setTerms] = useState(Array(numberOfTermsPerPlayer).fill(''));

  const handleTermChange = (index, value) => {
    const newTerms = [...terms];
    newTerms[index] = value;
    setTerms(newTerms);
  };

  const handleSubmit = () => {
    dispatch(addTermsForPlayer({ playerName: players[currentPlayerIndex], terms }));

    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setTerms(Array(numberOfTermsPerPlayer).fill('')); // We reset the terms for the next player
    } else {
        navigate('/game'); // All terms entered, game begins
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2><Badge bg="primary">{players[currentPlayerIndex]}</Badge> enter terms</h2>
      {terms.map((term, index) => (
        <input
          key={index}
          type="text"
          value={term}
          onChange={(e) => handleTermChange(index, e.target.value)}
          placeholder={`Term ${index + 1}`}
          style={{ margin: '10px 0' }}
        />
      ))}
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default TermsInputPage;
