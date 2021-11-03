import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import {
  GithubLogo, GoogleLogo, MatchLogo, TwitterLogo,
} from '../components/Logos';
import styles from '../styles/Welcome.module.css';
import {
  loginWithGitHub, loginWithGoogle, loginWithTwitter,
} from '../firebase/client';
import useUser, { USER_STATES } from '../hooks/useUser';

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace('/home');
  }, [user]);

  const handleGitHubLogin = () => {
    loginWithGitHub()
      .catch((error) => console.log(error.message));
  };
  const handleGoogleLogin = () => {
    loginWithGoogle().catch((error) => console.log(error))
      .catch((error) => console.log(error.message));
  };
  const handleTwitterLogin = () => {
    loginWithTwitter()
      .catch((error) => console.log(error.message));
  };

  // To aovoid flickering after spinner and redirecting to homePage
  if (user !== USER_STATES.NOT_KNOWN && user !== USER_STATES.NOT_LOGGED) {
    return null;
  }

  return (
    <div className={styles.mainContainer}>
      <MatchLogo className={styles.logo} width={95} height={95} />
      <h1 className={styles.title}>
        Welcome to
        {' '}
        <span>Grijeen</span>
      </h1>
      <h2 className={styles.subTitle}>
        An app that transform your
        {' '}
        <span>DREAMS</span>
        {' '}
        into ashes.
      </h2>
      { user === USER_STATES.NOT_LOGGED && (
      <div className={styles.loginButtonsContainer}>
        <Button onClick={handleGitHubLogin}>
          <GithubLogo fill="white" width={24} height={24} />
          Login with GitHub
        </Button>
        <Button onClick={handleGoogleLogin}>
          <GoogleLogo fill="white" width={24} height={24} />
          Login with Google
        </Button>
        <Button onClick={handleTwitterLogin}>
          <TwitterLogo fill="white" width={24} height={24} />
          Login with Twitter
        </Button>
      </div>
      )}
      { user === USER_STATES.NOT_KNOWN && <img className={styles.spinner} src="./spinner.gif" alt="spinner" />}
    </div>
  );
}
