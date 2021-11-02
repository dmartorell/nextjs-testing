import { useState } from 'react';
import { useRouter } from 'next/router';
import { addTweet } from '../../../firebase/client';
import Button from '../../../components/Button';
import useUser from '../../../hooks/useUser';
import styles from '../../../styles/ComposeTweet.module.css';

const COMPOSE_STATUS = {
  USER_UNKNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};
const ComposeTweet = () => {
  const router = useRouter();
  const user = useUser();
  const [message, setMessage] = useState('');
  const [composeStatus, setComposeStatus] = useState(COMPOSE_STATUS.USER_UNKNOWN);

  const handleSubmit = (event) => {
    event.preventDefault();
    setComposeStatus(COMPOSE_STATUS.LOADING);
    addTweet({
      userName: user.username,
      content: message,
      avatar: user.avatar,
      userId: user.uid,
    })
      .then(() => {
        router.push('/home');
        setComposeStatus(COMPOSE_STATUS.SUCCESS);
      })
      .catch((e) => {
        console.log('Error adding tweet: ', e);
        setComposeStatus(COMPOSE_STATUS.ERROR);
      });
  };

  return (

    <>
      {user && user.avatar && (
      <section className={styles.section}>
        <div className={styles.composeContainer}>
          <img
            className={styles.avatar}
            crossOrigin="anonymous"
            width={50}
            height={50}
            src={user.avatar}
            alt={user?.alt}
          />
          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <textarea
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              className={styles.textarea}
              placeholder="¿Qué está pasando?"
              name="textarea"
              value={message}
              onChange={({ target }) => { setMessage(target.value); }}
            />
            <Button
              className={styles.button}
              type="submit"
              disabled={message.length === 0 || composeStatus === COMPOSE_STATUS.LOADING}
            >
              Twittear

            </Button>
          </form>
        </div>
      </section>
      )}
    </>
  );
};

export default ComposeTweet;
