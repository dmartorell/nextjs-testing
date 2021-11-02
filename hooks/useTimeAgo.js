// import { useEffect, useState } from 'react';

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];
const getValuePerTimeUnit = (_tweetDateInSeconds) => {
  const dateDiff = (_tweetDateInSeconds - Date.now()) / 1000;
  // eslint-disable-next-line no-restricted-syntax
  for (const [unit, seconds] of DATE_UNITS) {
    if (Math.abs(dateDiff) >= seconds) {
      const value = Math.ceil(dateDiff / seconds);
      return { value, unit };
    }
  }
  return null;
};

const useTimeAgo = (tweetDateInSeconds) => {
  const { value, unit } = getValuePerTimeUnit(tweetDateInSeconds);
  const rtf = new Intl.RelativeTimeFormat('es');
  return rtf.format(value, unit);
};

export default useTimeAgo;
