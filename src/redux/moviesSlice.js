import { createSlice } from '@reduxjs/toolkit';

export const moviesReducer = createSlice({
  name: 'movies',
  initialState: {
    movies: []
  },
  reducers: {
    fetchMovies: (state, { payload }) => {
      state.movies = payload;
    }
  }
});

export const { fetchMovies } = moviesReducer.actions;

export default moviesReducer.reducer;
