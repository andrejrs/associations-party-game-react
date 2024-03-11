import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNumberOfTeams, setnumberOfTermsPerPlayer, setShowRound, setSourceOfTerms } from '../features/teams/teamsSlice';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { SourceType } from '../Enums';

const TeamSetupPage = () => {
  const [numberOfTeams, setNumberOfTeamsLocal] = useState(2);
  const [numberOfTermsPerPlayer, setnumberOfTermsPerPlayerLocal] = useState(1);
  const [source, setSource] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setShowRound(false));
  }, [dispatch]);

  const handleIncrement = (type) => {
    if (type === 'teams') {
      setNumberOfTeamsLocal(numberOfTeams + 1);
    } else if (type === 'questions') {
      setnumberOfTermsPerPlayerLocal(numberOfTermsPerPlayer + 1);
    }
  };

  const handleDecrement = (type) => {
    if (type === 'teams' && numberOfTeams > 1) {
      setNumberOfTeamsLocal(numberOfTeams - 1);
    } else if (type === 'questions' && numberOfTermsPerPlayer > 1) {
      setnumberOfTermsPerPlayerLocal(numberOfTermsPerPlayer - 1);
    }
  };

  const handleSubmit = () => {
    dispatch(setNumberOfTeams(numberOfTeams));
    dispatch(setnumberOfTermsPerPlayer(numberOfTermsPerPlayer));
    dispatch(setSourceOfTerms(source));
    navigate('/players');
  };

  // Function to handle option change
  const handleOptionChange = (changeEvent) => {
    setSource(changeEvent.target.value);
  };

  return (
    <div className="item-container">      
      <div>
        <Form.Label htmlFor="basic-url">Number of Teams:</Form.Label>
        <InputGroup className="mb-3">
          <Button variant="outline-secondary" id="button-addon1" size="lg" onClick={() => handleDecrement('teams')}>
            -
          </Button>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            value={numberOfTeams} readOnly
          />
          <Button variant="outline-secondary" id="button-addon2" size="lg" onClick={() => handleIncrement('teams')}>
            +
          </Button>
        </InputGroup>
      </div>
      <div>
        <Form.Label htmlFor="basic-url">Number of Terms per Player:</Form.Label>
        <InputGroup className="mb-3">
          <Button variant="outline-secondary" id="button-addon1" size="lg" onClick={() => handleDecrement('questions')}>
            -
          </Button>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            value={numberOfTermsPerPlayer} readOnly 
          />
          <Button variant="outline-secondary" id="button-addon2" size="lg" onClick={() => handleIncrement('questions')}>
            +
          </Button>
        </InputGroup>
      </div>
      <div className="mb-3">
        <Form.Check type={'radio'} id={`check-api-radio1`}>
          <Form.Check.Input type={'radio'} name="group1" value={SourceType.LOCAL} onChange={handleOptionChange} />
          <Form.Check.Label>{`Use local terms`}</Form.Check.Label>
        </Form.Check>
        <Form.Check type={'radio'} id={`check-api-radio`}>
          <Form.Check.Input type={'radio'} name="group1" value={SourceType.SELF} onChange={handleOptionChange} />
          <Form.Check.Label>{`You enter the terms yourself`}</Form.Check.Label>
        </Form.Check>
      </div>
      <Button variant="primary" onClick={handleSubmit} size="lg">Next</Button>
    </div>
  );
};

export default TeamSetupPage;
