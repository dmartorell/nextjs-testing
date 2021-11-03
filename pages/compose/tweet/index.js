import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { addTweet, uploadImage } from '../../../firebase/client';
import Button from '../../../components/Button';
import useUser from '../../../hooks/useUser';
import styles from '../../../styles/ComposeTweet.module.css';

const COMPOSE_STATUS = {
  USER_UNKNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

const ComposeTweet = () => {
  const router = useRouter();
  const user = useUser();
  const [message, setMessage] = useState('');
  const [composeStatus, setComposeStatus] = useState(COMPOSE_STATUS.USER_UNKNOWN);

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImageURL] = useState(null);

  useEffect(() => {
    const onProgress = {};
    const onError = {};
    const onComplete = () => console.log('completed');

    task.on('state_changed', onProgress, onError, onComplete);
  }, [task]);

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

  const handleDragEnter = () => {
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };
  const handleDragLeave = () => {
    setDrag(DRAG_IMAGE_STATES.NONE);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = event.dataTransfer.files[0];
    uploadImage(file).then(setTask);
  };

  return (

    <>
      <Head>
        <title>Create Tweet / Grijeen</title>
      </Head>
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
              className={
                drag === DRAG_IMAGE_STATES.DRAG_OVER
                  ? `${styles.textarea} ${styles.textareaDragOver}`
                  : styles.textarea
            }
              placeholder="¿Qué está pasando?"
              name="textarea"
              value={message}
              onChange={({ target }) => { setMessage(target.value); }}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
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
