import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithPopup, 
    GithubAuthProvider,
    GoogleAuthProvider,
    TwitterAuthProvider,
    onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC3IBQF9ZmxcDprwleaGT-n_jtnEakAjLM",
    authDomain: "ashesapp-616be.firebaseapp.com",
    projectId: "ashesapp-616be",
    storageBucket: "ashesapp-616be.appspot.com",
    messagingSenderId: "622725216039",
    appId: "1:622725216039:web:8e9d9911df6f5902a51b02"
  };

initializeApp(firebaseConfig);

export const loginWithGitHub = () => {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider);
}
  
export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider);
}

export const loginWithTwitter = () => {
    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
}

export const onUserStateChanged = (onChange) => {
    const auth = getAuth();
    onAuthStateChanged(auth, result => {
        if (result){
            const {
                displayName : username,
                email,
                photoURL : avatar } = result
                onChange({username, email, avatar})
        } 
    });
}

