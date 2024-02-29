import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const round = useSelector(state => state.teams.round);
  const showRound = useSelector(state => state.teams.showRound);

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: '#f8f9fa', padding: '10px', textAlign: 'center', zIndex: 1000 }}>
        {showRound ? (
            <h2>Round: {round}</h2>
        ) : (
            <h2>Associations Game</h2>
        )}
    </div>
  );
};

export default Header;
