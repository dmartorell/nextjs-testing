import { useEffect, useState } from 'react';

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

const useTimeAgo = (tweetDateInSeconds) => {
  const [timeAgo, setTimeAgo] = useState(null);
  useEffect(() => {
    const currentDate = Date.now();
    const dateDiff = (tweetDateInSeconds - currentDate) / 1000;
    const rtf = new Intl.RelativeTimeFormat('es');
    // eslint-disable-next-line no-restricted-syntax
    for (const [unit, seconds] of DATE_UNITS) {
      let value = null;
      if (Math.abs(dateDiff) >= seconds) {
        value = Math.ceil(dateDiff / seconds);
        setTimeAgo(rtf.format(value, unit));
        break;
      }
    }
  }, [tweetDateInSeconds]);
  return timeAgo;
};

export default useTimeAgo;
