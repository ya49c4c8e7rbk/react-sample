import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { useHistory, withRouter } from 'react-router-dom';
import type { Adminer } from '../../interfaces';
import { useCurrentAdminer } from '../hooks/useCurrentAdminer';

type OperationType = {
  login: (email: string, password: string) => void
  logout: () => void
}

const AuthAdminerContext = createContext<Adminer | null | undefined>(undefined);
const AuthOperationContext = createContext<OperationType>({
  login: (_) => console.error('Providerが設定されていません'),
  logout: () => console.error('Providerが設定されていません'),
});

const AuthAdminerProvider: React.FC = ({ children }) => {
  const { currentAdminer, setCurrentAdminer } = useCurrentAdminer();
  const history = useHistory();

  const login = async (email: string, password: string) => {
    await axios({
      method: 'post', baseURL: process.env.REACT_APP_API_URL, url: '/adminers/login', data: { email, password },
    });
    const response = await axios({
      method: 'get', baseURL: process.env.REACT_APP_API_URL, url: '/adminers/profile',
    });
    setCurrentAdminer(response.data);

    history.push('/');
  };

  const logout = async () => {
    await axios({
      method: 'post', baseURL: process.env.REACT_APP_API_URL, url: '/adminers/logout',
    });
    setCurrentAdminer(null);

    history.push('/login');
  };

  return (
    <AuthOperationContext.Provider value={{ login, logout }}>
      <AuthAdminerContext.Provider value={currentAdminer}>
        { children }
      </AuthAdminerContext.Provider>
    </AuthOperationContext.Provider>
  );
};

export const useAuthAdminer = () => useContext(AuthAdminerContext);
export const useLogin = () => useContext(AuthOperationContext).login;
export const useLogout = () => useContext(AuthOperationContext).logout;

export default withRouter(AuthAdminerProvider);
