import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import Twitt from '../../components/Twitt';
import { fetchLatestTweets } from '../../firebase/client';
import useUser from '../../hooks/useUser';

const HomePage = () => {
  const [timeline, setTimeline] = useState(null);
  const user = useUser();

  useEffect(() => {
    fetchLatestTweets()
      .then(setTimeline);
  }, [user]);

  return (
    timeline
        && (
        <>
          <header className={styles.header}>
            <h3>Inicio</h3>
          </header>
          <section className={styles.section}>
            {
            timeline.map(({
              id, content, avatar, userName, createdAt,
            }) => (
              <Twitt
                key={id}
                content={content}
                avatar={avatar}
                userName={userName}
                createdAt={createdAt}
              />
            ))
        }
          </section>
          <nav className={styles.nav}>
            <h3>Navigator</h3>
          </nav>
        </>
        )
  );
};

export default HomePage;
