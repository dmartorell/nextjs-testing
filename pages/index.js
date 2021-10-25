import {useState, useEffect} from 'react';
import Button from "../components/Button";
import GithubLogo from "../components/logos/GitHub";
import GoogleLogo from "../components/logos/Google";
import MatchLogo from "../components/logos/Match";
import TwitterLogo from '../components/logos/Twitter';
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import { loginWithGitHub, loginWithGoogle, loginWithTwitter, onUserStateChanged } from "../firebase/client";


export default function Home() {

  const [user, setUser] = useState(null);
  
  const handleGitHubLogin = () => {
    loginWithGitHub()
      .catch(error => console.log(error.message))
  }
  const handleGoogleLogin = () => {
    loginWithGoogle().catch(error => console.log(error))
      .catch(error => console.log(error.message))

  }
  const handleTwitterLogin = () => {
    loginWithTwitter()
    .catch(error => console.log(error.message))
  }

  useEffect(()=> {
    onUserStateChanged (setUser);
  }, [])

  return (
    <div>
        <MatchLogo className={styles.logo} width={95} height={95}/>        
        <h1 className={styles.title}>
          Welcome to <span>Grijeen</span>
        </h1>
        <h2 className={styles. subTitle}>An app that transform your <span>DREAMS</span> into ashes.</h2>
        {
          user ?
          <div className={styles.userInfoContainer}>
          <Image className={styles.avatar} width={70} height={70} src={user.avatar} alt="user's profile pic"></Image>
          <p className={styles.userName}>{user.username}</p>
          <p className={styles.email}>{user.email}</p>
        </div>
        :
        null
        }
        { user === null && 
        <div className={styles.loginButtonsContainer}>
          <Button onClick={handleGitHubLogin}>
            <GithubLogo fill="white" width={24} height={24}/>
            Login with GitHub
          </Button>
          <Button onClick={handleGoogleLogin}>
            <GoogleLogo fill="white" width={24} height={24}/>
            Login with Google
          </Button>
          <Button onClick={handleTwitterLogin}>
            <TwitterLogo fill="white" width={24} height={24}/>
            Login with Twitter
          </Button>
        </div>}
    </div>
  )
}
