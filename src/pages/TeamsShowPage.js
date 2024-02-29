import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const TeamsShowPage = () => {
  const players = useSelector(state => state.teams.players);
  const numberOfTeams = useSelector(state => state.teams.numberOfTeams);
  const navigate = useNavigate();

  const divideArrayIntoNParts = (originalArray, numberOfParts) => {
    const newArray = [];
    const partSize = Math.ceil(originalArray.length / numberOfParts);
    for (let i = 0; i < originalArray.length; i += partSize) {
      newArray.push(originalArray.slice(i, i + partSize));
    }
  
    return newArray;
  }

  const shuffleArray = (array) => {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const teams = divideArrayIntoNParts(shuffleArray([...players]), numberOfTeams);

  const handleNext = () => {
    navigate('/terms');
  };

  return (
    <div className="item-container">
      <h1>Teams</h1>
      <ul>
        {teams.map((team, index) => (
          <ListGroup as="ul" className='mb-4'>
            <ListGroup.Item as="li" active>Players of Team {index+1}</ListGroup.Item>
            {team.map((team1, index1) => (
            <ListGroup.Item as="li">{team1}</ListGroup.Item>
          ))}
          </ListGroup>
        ))}
      </ul>
      <Button variant="primary" onClick={handleNext} size="lg">Next</Button>
    </div>
  );
};

export default TeamsShowPage;
