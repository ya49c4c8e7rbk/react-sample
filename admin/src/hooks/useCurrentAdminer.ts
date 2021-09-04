import { useContext } from 'react';

import { CurrentAdminerContext } from '../context/CurrentAdminer';

export const useCurrentAdminer = () => {
  const { currentAdminer, setCurrentAdminer } = useContext(CurrentAdminerContext);
  const isAuthChecking = currentAdminer === undefined;

  if (!setCurrentAdminer) {
    throw new Error('useCurrentAdminerForAppInit is needs to be used in CurrentAdminerProvider.');
  }

  return { currentAdminer, setCurrentAdminer, isAuthChecking };
};
