import { useState, useEffect } from 'react';
import useTimeAgo from '../../hooks/useTimeAgo';
import styles from '../../styles/Twitt.module.css';

const Twitt = ({
  avatar, userName, content, createdAt,
}) => {
  const [timeAgo, setTimeAgo] = useState(() => useTimeAgo(createdAt));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(() => useTimeAgo(createdAt));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <article className={styles.twittContainer}>
      <img className={styles.avatar} width={40} height={40} src={avatar} alt="user's profile pic" />
      <div>
        <strong className={styles.twittUsername}>{userName}</strong>
        <span> · </span>
        <time className={styles.date}>{timeAgo}</time>
        <p className={styles.twittMessage}>{content}</p>
      </div>
    </article>
  );
};

export default Twitt;
