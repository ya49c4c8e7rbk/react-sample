import type { Dispatch, FC, SetStateAction } from 'react';
import React, { createContext, useState } from 'react';

import type { User } from '../../interfaces';

type CurrentUserContextProps = {
  currentUser: User | null | undefined
  setCurrentUser: Dispatch<SetStateAction<User | null | undefined>> | null
}
export const CurrentUserContext = createContext<CurrentUserContextProps>({
  currentUser: undefined,
  setCurrentUser: null,
});

export const CurrentUserProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
