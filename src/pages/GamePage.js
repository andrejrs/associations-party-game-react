import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateScore, nextTeam, nextRound, selectCurrentTerms, setShowRound, startGame } from '../features/teams/teamsSlice';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const MAX_ROUNDS = 3;
const TIMER_VALUE = 60;

const GamePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTerms = useSelector(selectCurrentTerms);
  const currentTeam = useSelector(state => state.teams.currentTeam);
  const round = useSelector(state => state.teams.round);
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(-1);
  const [timerActive, setTimerActive] = useState(false);

  /**
   * Initial
   */
  useEffect(() => {
    dispatch(setShowRound(true));
    dispatch(startGame());
  }, [dispatch]);

  /**
   * Timer
   */
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setTimerActive(false);
      dispatch(nextTeam());
      setTimeLeft(-1);
    }

    return () => clearInterval(interval);
  }, [timeLeft, timerActive, dispatch]);

  const startTimer = (time) => {
    setTimeLeft(time);
    setTimerActive(true);
  };

  /**
   * Redirect to score page
   */
  useEffect(() => {
    if (round > MAX_ROUNDS) {
      dispatch(setShowRound(false));
      navigate('/score');
    }
  }, [round, navigate, dispatch]);

  /**
   * Handle Correct term
   */
  const handleCorrect = () => {
    dispatch(updateScore({ team: currentTeam, score: 1 }));

    if (currentTermIndex < currentTerms.length - 1) {
      setCurrentTermIndex(currentTermIndex + 1);
    } else {
      dispatch(nextRound());
      setCurrentTermIndex(0); // We reset the term index
      setTimeLeft(-1); // We reset the timer
      setTimerActive(false); // We stop the timer
    }
  };

  return (
    <div className="item-container">
      <h2>The team currently playing is:</h2>
      <h1>Team {currentTeam}</h1>
      <p>Remaining terms: {currentTerms.length - currentTermIndex}</p>
      {!timerActive ? (<>
        <div className='colored'>
          <Button variant="primary" onClick={() => startTimer(TIMER_VALUE)} size="lg">Start</Button>
        </div>
        </>
      ) : (
        <div className='colored'>
          <p>Time left: <Badge bg="secondary">{timeLeft}</Badge> seconds</p>
          {currentTerms[currentTermIndex].image ? (
            <img className="photo" src={currentTerms[currentTermIndex].image } alt={currentTerms[currentTermIndex].term} />
          ) : ''}
          <h1><Badge bg="primary" className='fs-1'>{currentTerms[currentTermIndex].term}</Badge></h1>
          <Button variant="success" onClick={handleCorrect} size="lg">Correct</Button>
        </div>
      )}
    </div>
  );
};

export default GamePage;
