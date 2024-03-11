import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlayer } from '../features/teams/teamsSlice';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const PlayerInputPage = () => {
  const [players, setPlayers] = useState(['']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlayerChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
    if (index === players.length - 1) {
      setPlayers([...newPlayers, '']);
    }
  };

  const handleSubmit = () => {
    const filteredPlayers = players.filter(player => player.trim() !== '');
    filteredPlayers.forEach(player => {
      dispatch(addPlayer(player.trim()));
    });

    navigate('/teams');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {players.map((player, index) => (
        <div className='mb-4' key={index}>
          <Form.Control
              type="text"
              value={player}
              onChange={(e) => handlePlayerChange(index, e.target.value)}
              placeholder="Enter player name"
              />
        </div>
      ))}
      <Button variant="primary" onClick={handleSubmit} size="lg">Next</Button>
    </div>
  );
};

export default PlayerInputPage;
