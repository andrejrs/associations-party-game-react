import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  numberOfTeams: 2,
  numberOfTermsPerPlayer: 2,
  players: ['Marko', 'Ivana', 'Petar', 'Gordana', 'Ivan', 'Stefan'],
  terms: ['Sunce','Kasika','Oblak','Zvezda','Planeta','Sunce','Kasika','Oblak','Zvezda','Planeta'],
  round: 1,
  currentTeam: 1,
  scores: [0,0],
  showRound: false
};

// const initialState = {
//   numberOfTeams: 0,
//   numberOfTermsPerPlayer: 0,
//   players: [],
//   terms: [],
//   round: 1,
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
      for (let i=1; i<=state.numberOfTeams; i++) {
        state.scores.push(0);
      }
      state.round = 1;
      state.currentTeam = 1;
    },
    setnumberOfTermsPerPlayer: (state, action) => {
      state.numberOfTermsPerPlayer = action.payload;
    },
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    addTermsForPlayer: (state, action) => {
      const { terms } = action.payload;
      state.terms = state.terms.concat(terms);
    },
    nextTeam: (state, action) => {
      if (state.numberOfTeams > state.currentTeam) {
          state.currentTeam += 1;
      } else {
          state.currentTeam = 1;
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
    addPlayer,
    addTermsForPlayer,
    nextTeam,
    nextRound,
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