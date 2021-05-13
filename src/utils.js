export function throttle(callback, interval) {
  let invoke = true;
  return function (...args) {
    if (!invoke) {
      console.log('cooldown period');
      return null;
    } else {
      invoke = false;
      callback.apply(this, args);
      setTimeout(() => (invoke = true), interval);
    }
  };
}
