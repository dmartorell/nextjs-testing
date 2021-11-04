import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';

import {
  getStorage, ref, uploadBytesResumable,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBQqYchfAU20JWWlOhAoWUeiJ3FNQeFQEM',
  authDomain: 'ashes-11b8a.firebaseapp.com',
  projectId: 'ashes-11b8a',
  storageBucket: 'ashes-11b8a.appspot.com',
  messagingSenderId: '709856273965',
  appId: '1:709856273965:web:c56f0059c1c69157f3baa4',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const loginWithGitHub = () => {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, provider);
};

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, provider);
};

export const loginWithTwitter = () => {
  const provider = new TwitterAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, provider);
};

export const onUserStateChanged = (onChange) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (result) => {
    let userValue = null;
    if (result) {
      const {
        displayName: username,
        email,
        photoURL: avatar,
        uid,
      } = result;
      userValue = {
        username, email, avatar, uid,
      };
    }
    return onChange(userValue);
  });
};

export const addTweet = async ({
  userName, content, avatar, userId,
}) => addDoc(collection(db, 'tweets'), {
  userName,
  content,
  avatar,
  userId,
  createdAt: new Date(),
  likesCount: 0,
  sharedCount: 0,
});

export const fetchLatestTweets = async () => {
  const q = query(collection(db, 'tweets'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const { id } = doc;
    const { createdAt } = data;

    return { ...data, id, createdAt: createdAt.toDate() };
  });
};

export const uploadImage = (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return uploadTask;
};
