import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL, IMAGE_URL } from '../services/apiService/movies.service';

let MOVIES_TYPE = '';

export const typeToTitleEnum = {
  popular: 'Most Popular on the Planet',
  top_rated: 'Most appeciated by critics and wide audience',
  upcoming: 'Anticipated movies currently in production',
  now_playing: 'Now Showing in Cinema'
};

export const getMoviesByType = createAsyncThunk(
  'movies/byType',
  async ({ type }, thunkApi) => {
    MOVIES_TYPE = type;
    const nextPageToFetch = thunkApi.getState().movies.page;
    const response = await API_URL(type, nextPageToFetch);
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
    currentlyShowing: 'popular',
    setGridIntoView: false,
    currentSlideshowImages: [],
    page: 1,
    totalPages: 0
  },
  reducers: {
    setPreloadedData: (state, { payload: { type, data } }) => {
      state.movies[type] = data;
      state.totalPages = data.total_pages;
    },
    setCurrentList: (state, { payload }) => {
      state.currentlyShowing = payload;
    },
    setIntoView: (state, { payload }) => {
      state.setGridIntoView = true;
    },
    clearScroller: (state, { payload }) => {
      state.setGridIntoView = false;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    }
  },
  extraReducers: {
    [getMoviesByType.fulfilled]: (state, { payload }) => {
      state.movies[MOVIES_TYPE] = payload;
      state.totalPages = payload.total_pages;
      state.currentSlideshowImages = payload.results.map(
        (img) => `${IMAGE_URL}${img.poster_path}`
      );
      localStorage.setItem(MOVIES_TYPE, JSON.stringify(payload));
      const saveByPageMarker = `type: ${MOVIES_TYPE}, page: ${state.page}`;
      if (!localStorage.getItem(saveByPageMarker)) {
        localStorage.setItem(saveByPageMarker, JSON.stringify(payload));
      }
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
  clearScroller,
  setPage
} = moviesReducer.actions;

export default moviesReducer.reducer;
