import useTimeAgo from '../../hooks/useTimeAgo';
import styles from '../../styles/Twitt.module.css';

const formatCreatedAt = (_createdAt) => {
  const date = new Date(_createdAt);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  return new Intl.DateTimeFormat('es-ES', options).format(date);
};

const Twitt = ({
  avatar, userName, content, createdAt, img,
}) => {
  const timeAgo = useTimeAgo(createdAt);
  const formatDate = formatCreatedAt(createdAt);

  return (
    <article className={styles.twittContainer}>
      <img className={styles.avatar} width={40} height={40} src={avatar} alt="user's profile pic" />
      <div style={{ width: '100%' }}>
        <strong className={styles.twittUsername}>{userName}</strong>
        <span> · </span>
        <time title={formatDate} className={styles.date}>{timeAgo}</time>
        <p className={styles.twittMessage}>{content}</p>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={img} alt={img} />
        </div>
      </div>
    </article>
  );
};

export default Twitt;
