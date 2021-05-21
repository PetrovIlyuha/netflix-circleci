import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  API_URL,
  IMAGE_URL,
  SEARCH_API_URL,
  fallbackImagesFirstLoaded,
  GET_MOVIE_VIDEOS,
  GET_YOUTUBE_PREVIEW,
  GET_MOVIE_DETAILS,
  GET_MOVIE_CAST,
  GET_ACTORS_IMAGES
} from '../services/apiService/movies.service';
let MOVIES_TYPE = '';

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

export const getMovieVideos = createAsyncThunk('movie/videos', async (id) => {
  const response = await GET_MOVIE_VIDEOS(id);
  const data = await response.json();
  const movie_youtube_key = data.results.find(
    (movie) => movie.site === 'YouTube'
  ).key;
  const youtube_response = await GET_YOUTUBE_PREVIEW(movie_youtube_key);
  return await youtube_response.json();
});

export const getAllMovieVideos = createAsyncThunk(
  'movie/all-videos',
  async (id) => {
    const response = await GET_MOVIE_VIDEOS(id);
    const data = await response.json();
    const links = data.results;
    const allVideos = [];
    for await (const link of links) {
      const nextYoutubeVideo = await (
        await GET_YOUTUBE_PREVIEW(link.key)
      ).json();
      allVideos.push(nextYoutubeVideo);
    }
    return allVideos;
  }
);

export const getMovieDetails = createAsyncThunk('movie/details', async (id) => {
  const response = await GET_MOVIE_DETAILS(id);
  return await response.json();
});

export const getMovieCast = createAsyncThunk(
  'movie/getCasting',
  async (movieId) => {
    const response = await GET_MOVIE_CAST(movieId);
    const movieCastData = await response.json();
    const topActors = movieCastData.cast.slice(0, 5);
    const actorsImages = [];
    for await (const actor of topActors) {
      const nextActorImages = await (await GET_ACTORS_IMAGES(actor.id)).json();
      actorsImages.push(nextActorImages);
    }
    return { cast: movieCastData, actorsImages };
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
    searchWord: '',
    youtubeVideo: null,
    movieDetails: null,
    movieDetailsError: null,
    errorLoadingAllVideos: null,
    allMovieTrailers: [],
    movieCast: null,
    actorsImages: [],
    movieCastRequestError: null,
    loadingThumbnailVideo: false,
    loadingThumbnailVideoError: null,
    hoveredMovieGridIndex: null
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
    },
    nullifyYoutubeVideoID: (state, { payload }) => {
      state.youtubeVideo = null;
    },
    setHoveredMovieGridIndex: (state, { payload }) => {
      state.hoveredMovieGridIndex = payload;
    },
    removeHoveredMovieGridIndex: (state, { payload }) => {
      state.hoveredMovieGridIndex = null;
    }
  },
  extraReducers: {
    [getMoviesByType.fulfilled]: (state, { payload }) => {
      state.movies[MOVIES_TYPE] = payload;
      state.totalPages = payload.total_pages;
      state.currentSlideshowImages = payload.results.map(
        (img) => `${IMAGE_URL}${img.poster_path}`
      );
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
    },
    [getMovieVideos.fulfilled]: (state, { payload }) => {
      state.youtubeVideo = payload;
      state.loadingThumbnailVideo = false;
    },
    [getMovieVideos.pending]: (state, { payload }) => {
      state.loadingThumbnailVideo = true;
    },
    [getMovieVideos.rejected]: (state, { payload }) => {
      state.loadingThumbnailVideoError = payload;
    },
    [getMovieDetails.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getMovieDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.movieDetailsError = payload;
    },
    [getMovieDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.movieDetails = payload;
    },
    [getAllMovieVideos.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getAllMovieVideos.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errorLoadingAllVideos = payload;
    },
    [getAllMovieVideos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allMovieTrailers = payload;
    },
    [getMovieCast.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getMovieCast.fulfilled]: (state, { payload: { cast, actorsImages } }) => {
      state.loading = false;
      state.movieCast = cast;
      state.actorsImages = actorsImages;
    },
    [getMovieCast.rejected]: (state, { payload }) => {
      state.movieCastRequestError = payload;
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
  setSearchedToEmpty,
  nullifyYoutubeVideoID,
  setHoveredMovieGridIndex,
  removeHoveredMovieGridIndex
} = moviesReducer.actions;

export default moviesReducer.reducer;
