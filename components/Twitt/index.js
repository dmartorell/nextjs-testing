import useTimeAgo from '../../hooks/useTimeAgo';
import styles from '../../styles/Twitt.module.css';

const Twitt = ({
  avatar, userName, content, createdAt,
}) => {
  const timeAgo = useTimeAgo(createdAt);

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
