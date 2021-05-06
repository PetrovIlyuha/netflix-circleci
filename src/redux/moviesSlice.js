import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  API_URL,
  IMAGE_URL,
  SEARCH_API_URL,
  fallbackImagesFirstLoaded
} from '../services/apiService/movies.service';
let MOVIES_TYPE = '';

// const setSearchWord = createAction('SET_SEARCH_WORD');

export const typeToTitleEnum = {
  popular: 'Most Popular on the Planet',
  top_rated: 'Most appeciated by critics and wide audience',
  upcoming: 'Anticipated movies currently in production',
  now_playing: 'Now Showing in Cinemas'
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

export const searchMovie = createAsyncThunk(
  'movies/search',
  async (searchTerm, thunkApi) => {
    thunkApi.dispatch(setSearchWord(searchTerm));
    if (searchTerm.length === 0) {
      thunkApi.dispatch(setSearchedToEmpty());
    }
    const nextPageToFetch = thunkApi.getState().movies.page;
    const response = await SEARCH_API_URL(searchTerm, nextPageToFetch);
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
    totalPages: 0,
    searchedMovies: [],
    searchError: null,
    totalSearchResults: 0,
    searchWord: ''
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
    },
    setSearchWord: (state, { payload }) => {
      state.searchWord = payload;
    },
    setSearchedToEmpty: (state, { payload }) => {
      state.searchedMovies = [];
      state.currentSlideshowImages = fallbackImagesFirstLoaded.slice(0, 6);
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
    },
    [searchMovie.fulfilled]: (state, { payload }) => {
      state.searchedMovies = payload.results;
      state.loading = false;
      state.totalPages = payload.total_pages;
      state.totalSearchResults = payload.total_results;
      state.currentSlideshowImages = payload.results.map(
        (img) => `${IMAGE_URL}${img.poster_path}`
      );
    },
    [searchMovie.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [searchMovie.rejected]: (state, { payload }) => {
      state.searchError = payload;
      state.loading = false;
    }
  }
});

export const {
  setPreloadedData,
  setCurrentList,
  setIntoView,
  clearScroller,
  setPage,
  setSearchWord,
  setSearchedToEmpty
} = moviesReducer.actions;

export default moviesReducer.reducer;
