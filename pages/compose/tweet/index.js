import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  getDownloadURL,
} from 'firebase/storage';
import { addTweet, uploadImage } from '../../../firebase/client';
import Button from '../../../components/Button';
import useUser from '../../../hooks/useUser';
import styles from '../../../styles/ComposeTweet.module.css';
import Close from '../../../components/Icons/Close';
import LoadingProgressBar from '../../../components/LoadingProgressBar';

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

const FILE_TYPES = [
  'image/jpeg',
  'image/png',
];

const ComposeTweet = () => {
  const router = useRouter();
  const user = useUser();
  const [message, setMessage] = useState('');
  const [composeStatus, setComposeStatus] = useState(COMPOSE_STATUS.USER_UNKNOWN);

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImageURL] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (task) {
      const onProgress = (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoadingProgress(progress);
      };
      const onError = (error) => { console.log(error); };
      const onComplete = () => {
        getDownloadURL(task.snapshot.ref).then((image) => {
          setImageURL(image);
          setTimeout(() => {
            setLoadingProgress(0);
          }, 200);
        });
      };

      task.on('state_changed',
        onProgress,
        onError,
        onComplete);
    }
  }, [task]);

  const handleCloseImage = () => {
    setImageURL(null);
    setLoadingProgress(0);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setComposeStatus(COMPOSE_STATUS.LOADING);
    addTweet({
      userName: user.username,
      content: message,
      avatar: user.avatar,
      userId: user.uid,
      img: imgURL,
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

  const handleDragEnter = (event) => {
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
    const { type: fileType } = event.dataTransfer.items[0];
    if (!FILE_TYPES.includes(fileType)) {
      setDrag(DRAG_IMAGE_STATES.ERROR);
    }
  };
  const handleDragLeave = () => {
    setDrag(DRAG_IMAGE_STATES.NONE);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const { type: fileType } = event.dataTransfer.items[0];
    if (FILE_TYPES.includes(fileType)) {
      setDrag(DRAG_IMAGE_STATES.NONE);
      const file = event.dataTransfer.files[0];
      const taskFromDB = uploadImage(file);
      setTask(taskFromDB);
    }
    setDrag(DRAG_IMAGE_STATES.NONE);
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
                // eslint-disable-next-line no-nested-ternary
                drag === DRAG_IMAGE_STATES.DRAG_OVER
                  ? `${styles.textarea} ${styles.textareaDragOver}`
                  : drag === DRAG_IMAGE_STATES.ERROR
                    ? `${styles.textarea} ${styles.textareaDragOverError}`
                    : `${styles.textarea}`

            }
              placeholder="¿Qué está pasando?"
              name="textarea"
              value={message}
              onChange={({ target }) => { setMessage(target.value); }}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            <LoadingProgressBar width={loadingProgress} />
            {imgURL && (
            <div className={styles.imageContainer}>
              <img src={imgURL} alt={imgURL} />
              <Close
                className={styles.closeButton}
                onClick={handleCloseImage}
                width={38}
                height={38}
                fill="#1A1a1A88"
                stroke="#FFFFFF"
              />
            </div>
            )}
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
