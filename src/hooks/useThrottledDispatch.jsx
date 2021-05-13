import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovie } from '../redux/moviesSlice';
import { throttle } from '../utils';

export const useThrottledDispatch = () => {
  const dispatch = useDispatch();
  const throttled = throttle((...args) => {
    dispatch(...args);
  }, 800);
  return useCallback(
    (...args) => {
      throttled(searchMovie(...args));
    },
    [throttled]
  );
};
