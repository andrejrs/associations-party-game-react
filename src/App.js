// import logo from './logo.svg';
import './App.css';

import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeamSetupPage from './pages/TeamSetupPage';
import PlayerInputPage from './pages/PlayerInputPage';
import TeamsShowPage from './pages/TeamsShowPage';
import TermsInputPage from './pages/TermsInputPage';
import GamePage from './pages/GamePage';
import ScorePage from './pages/ScorePage';
import Header from './components/Header'; // Pretpostavljamo da je Header u folderu components
import 'bootstrap/dist/css/bootstrap.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <div style={{ paddingTop: '60px' }}> 
          <Routes>
            <Route path='/' element={<TeamSetupPage/>} />
            <Route path='/players' element={<PlayerInputPage/>} />
            <Route path='/teams' element={<TeamsShowPage/>} />
            <Route path='/terms' element={<TermsInputPage/>} />
            <Route path='/game' element={<GamePage/>} />
            <Route path='/score' element={<ScorePage/>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
