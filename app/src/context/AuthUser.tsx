import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { useHistory, withRouter } from 'react-router-dom';
import type { User } from '../../interfaces';
import { useCurrentUser } from '../hooks/useCurrentUser';

type OperationType = {
  login: (email: string, password: string) => void
  logout: () => void
}

const AuthUserContext = createContext<User | null | undefined>(undefined);
const AuthOperationContext = createContext<OperationType>({
  login: (_) => console.error('Providerが設定されていません'),
  logout: () => console.error('Providerが設定されていません'),
});

const AuthUserProvider: React.FC = ({ children }) => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const history = useHistory();

  const login = async (email: string, password: string) => {
    const response = await axios({
      method: 'post', baseURL: process.env.REACT_APP_API_URL, url: '/users/login', data: { email, password },
    });
    const response2 = await axios({
      method: 'get', baseURL: process.env.REACT_APP_API_URL, url: '/users/profile',
    });
    const response3 = await axios({
      method: 'get', baseURL: process.env.REACT_APP_API_URL, url: '/users/refresh-tokens',
    });
    console.log(response, response2, response3);
    setCurrentUser(response2.data);
    history.push('/');
  };

  const logout = async () => {
    const response = await axios({
      method: 'post', baseURL: process.env.REACT_APP_API_URL, url: '/users/logout',
    });
    console.log(response);
    setCurrentUser(null);
    history.push('/login');
  };

  return (
    <AuthOperationContext.Provider value={{ login, logout }}>
      <AuthUserContext.Provider value={currentUser}>
        { children }
      </AuthUserContext.Provider>
    </AuthOperationContext.Provider>
  );
};

export const useAuthUser = () => useContext(AuthUserContext);
export const useLogin = () => useContext(AuthOperationContext).login;
export const useLogout = () => useContext(AuthOperationContext).logout;

export default withRouter(AuthUserProvider);
