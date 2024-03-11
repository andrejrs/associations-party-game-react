import { createSlice, createSelector } from '@reduxjs/toolkit';
import { SourceType } from '../../Enums';

const initialState = {
  numberOfTeams: 2,
  numberOfTermsPerPlayer: 2,
  players: ['Marko', 'Ivana', 'Petar', 'Gordana', 'Ivan', 'Stefan'],
  terms: [],
  enteredTerms: ['Sunce','Kasika','Oblak','Zvezda','Planeta','Sunce','Kasika','Oblak','Zvezda','Planeta'],
  round: 0,
  currentTeam: 1,
  scores: [0,0],
  showRound: false,
  sourceOfTerms: SourceType.LOCAL
};

// const initialState = {
//   numberOfTeams: 0,
//   numberOfTermsPerPlayer: 0,
//   players: [],
//   terms: [],
//   round: 0,
//   currentTeam: 1,
//   scores: [],
//   showRound: false
// };

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setNumberOfTeams: (state, action) => {
      state.numberOfTeams = action.payload;
      state.terms = [];
      state.players = [];
      state.scores = [];
      state.enteredTerms = [];
      for (let i=1; i<=state.numberOfTeams; i++) {
        state.scores.push(0);
      }
      state.round = 0;
      state.currentTeam = 1;
    },
    setnumberOfTermsPerPlayer: (state, action) => {
      state.numberOfTermsPerPlayer = action.payload;
    },
    setSourceOfTerms: (state, action) => {
      state.sourceOfTerms = action.payload;
    },
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    addTermsForPlayer: (state, action) => {
      const { enteredTerms } = action.payload;
      state.enteredTerms = state.enteredTerms.concat(enteredTerms);
    },
    nextTeam: (state, action) => {
      if (state.numberOfTeams > state.currentTeam) {
          state.currentTeam += 1;
      } else {
          state.currentTeam = 1;
      }
    },
    startGame: (state, action) => {
      if (state.round === 0) {
        const data = [];
        // Automatically import all files ending in *.jpg from the images folder
        const imagesReq = require.context('../../assets/images/terms', false, /\.webp$/);
        const images = shuffleArray(imagesReq.keys().map(imagesReq));
        // Get total number of terms
        const n = state.sourceOfTerms === SourceType.LOCAL ? state.players.length * state.numberOfTermsPerPlayer : state.players.length;
        for(let i = 0; i<n; i++) {
          if (state.sourceOfTerms === SourceType.LOCAL) {
            // Extract file name including spaces without extension and additional hash using regular expression
            const fileNameWithSpacesAndHash = images[i].match(/\/([^/]+)\.\w+(?=\.)/)[1];
            data.push({
              term: fileNameWithSpacesAndHash,
              image: images[i]
            });
          } else {
            data.push({
              term: state.enteredTerms[i],
              image: null
            });
          }
        }
        state.terms = data;
        state.round = 1;
      }
    },
    nextRound: (state, action) => {      
      state.round += 1;
      state.currentTeam = 1;
      shuffleArray(state.terms);
    },
    updateScore: (state, action) => {
        state.scores[state.currentTeam-1] += 1;
    },
    setShowRound: (state, action) => {
        state.showRound = action.payload;
    },
  },
});

export const {
    setNumberOfTeams,
    setnumberOfTermsPerPlayer,
    setSourceOfTerms,
    addPlayer,
    addTermsForPlayer,
    nextTeam,
    nextRound,
    startGame,
    updateScore,
    setShowRound,
} = teamsSlice.actions;

// Select all states
const selectTeamsState = (state) => state.teams;

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

export const selectCurrentTerms = createSelector([selectTeamsState], (teamsState) => {
    const { terms } = teamsState;
    
    return terms;
});

export default teamsSlice.reducer;