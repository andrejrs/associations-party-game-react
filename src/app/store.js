import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import teamsReducer from '../features/teams/teamsSlice';

const preloadedState = localStorage.getItem('appState') ? JSON.parse(localStorage.getItem('appState')) : {};

function localStorageMiddleware(store) {
  return next => action => {
    const result = next(action);
    localStorage.setItem('appState', JSON.stringify(store.getState()));
    return result;
  };
}

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});
