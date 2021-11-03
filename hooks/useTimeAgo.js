import { useEffect, useState } from 'react';

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];
const getValuePerTimeUnit = (_timestamp) => {
  const dateDiff = (_timestamp - Date.now()) / 1000;
  // eslint-disable-next-line no-restricted-syntax
  for (const [unit, seconds] of DATE_UNITS) {
    if (Math.abs(dateDiff) > seconds || unit === 'second') {
      const value = Math.floor(dateDiff / seconds);
      return { value, unit };
    }
  }
  return null;
};

const useTimeAgo = (timestamp) => {
  const [timeAgo, setTimeAgo] = useState(() => getValuePerTimeUnit(timestamp));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getValuePerTimeUnit(timestamp));
    }, 14000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const { value, unit } = timeAgo;
  const rtf = new Intl.RelativeTimeFormat('es', { style: 'narrow' });
  return rtf.format(value, unit);
};

export default useTimeAgo;
