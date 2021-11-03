import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Twitt from '../../components/Twitt';
import { fetchLatestTweets } from '../../firebase/client';
import useUser from '../../hooks/useUser';
import Create from '../../components/Icons/Create';
import Home from '../../components/Icons/Home';
import Search from '../../components/Icons/Search';

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
          <Head>
            <title>Home / Grijeen</title>
          </Head>
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
            <Link href="/compose/tweet">
              <a className={styles.navAnchor}>
                <Home stroke="#09f" width={26} height={26} />
              </a>
            </Link>
            <Link href="/compose/tweet">
              <a className={styles.navAnchor}>
                <Search stroke="#09f" width={26} height={26} />
              </a>
            </Link>
            <Link href="/compose/tweet">
              <a className={styles.navAnchor}>
                <Create stroke="#09f" width={26} height={26} />
              </a>
            </Link>
          </nav>
        </>
        )
  );
};

export default HomePage;
