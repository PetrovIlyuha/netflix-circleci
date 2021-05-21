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

export const numToCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2
  }).format(amount);
