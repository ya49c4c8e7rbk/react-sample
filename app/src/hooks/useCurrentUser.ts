import { useContext } from 'react';

import { CurrentUserContext } from '../context/CurrentUser';

export const useCurrentUser = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const isAuthChecking = currentUser === undefined;

  if (!setCurrentUser) {
    throw new Error('useCurrentUserForAppInit is needs to be used in CurrentUserProvider.');
  }

  return { currentUser, setCurrentUser, isAuthChecking };
};
