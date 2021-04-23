import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let MOVIES_TYPE = '';

export const typeToTitleEnum = {
  popular: 'Most Popular on the Planet',
  top_rated: 'Most appeciated by critics and wide audience',
  upcoming: 'Anticipated movies currently in production',
  now_playing: 'Now Showing in Cinema'
};

export const getMoviesByType = createAsyncThunk(
  'movies/byType',
  async (api_path) => {
    MOVIES_TYPE = api_path;
    const response = await fetch(
      `${process.env.REACT_APP_MOVIE_DB_URL}/movie/${api_path}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`
    );
    return await response.json();
  }
);

export const triggerScrollToGrid = () => async (dispatch) => {
  dispatch(setIntoView());
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
  dispatch(clearScroller());
};

export const moviesReducer = createSlice({
  name: 'movies',
  initialState: {
    movies: {},
    apiError: '',
    loading: false,
    currentlyShowing: '',
    setGridIntoView: false
  },
  reducers: {
    setPreloadedData: (state, { payload: { type, data } }) => {
      state.movies[type] = data;
    },
    setCurrentList: (state, { payload }) => {
      state.currentlyShowing = payload;
    },
    setIntoView: (state, { payload }) => {
      state.setGridIntoView = true;
    },
    clearScroller: (state, { payload }) => {
      state.setGridIntoView = false;
    }
  },
  extraReducers: {
    [getMoviesByType.fulfilled]: (state, { payload }) => {
      state.movies[MOVIES_TYPE] = payload;
      localStorage.setItem(MOVIES_TYPE, JSON.stringify(payload));
      state.loading = false;
    },
    [getMoviesByType.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getMoviesByType.rejected]: (state, { payload }) => {
      state.apiError = payload;
      state.loading = false;
    }
  }
});

export const {
  setPreloadedData,
  setCurrentList,
  setIntoView,
  clearScroller
} = moviesReducer.actions;

export default moviesReducer.reducer;
