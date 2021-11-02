import { useState, useEffect } from 'react';
import { onUserStateChanged } from '../firebase/client';

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

const useUser = () => {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
  useEffect(() => {
    onUserStateChanged(setUser);
  }, []);
  return user;
};

export default useUser;
