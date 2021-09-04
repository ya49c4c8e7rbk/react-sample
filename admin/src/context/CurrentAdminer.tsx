import type { Dispatch, FC, SetStateAction } from 'react';
import React, { createContext, useState } from 'react';

import type { Adminer } from '../../interfaces';

type CurrentAdminerContextProps = {
  currentAdminer: Adminer | null | undefined
  setCurrentAdminer: Dispatch<SetStateAction<Adminer | null | undefined>> | null
}
export const CurrentAdminerContext = createContext<CurrentAdminerContextProps>({
  currentAdminer: undefined,
  setCurrentAdminer: null,
});

export const CurrentAdminerProvider: FC = ({ children }) => {
  const [currentAdminer, setCurrentAdminer] = useState<Adminer | null | undefined>(undefined);

  return (
    <CurrentAdminerContext.Provider value={{ currentAdminer, setCurrentAdminer }}>
      {children}
    </CurrentAdminerContext.Provider>
  );
};
