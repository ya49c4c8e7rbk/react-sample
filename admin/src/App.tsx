import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, RouteProps, Switch,
} from 'react-router-dom';
import axios from 'axios';
import AuthAdminerProvider from './context/AuthAdminer';
import { CurrentAdminerProvider } from './context/CurrentAdminer';
import Login from './pages/Login';
import Home from './pages/Home';

axios.interceptors.request.use(
  (config) => {
    const tmpConfig = config;
    tmpConfig.withCredentials = true;
    return tmpConfig;
  },
);

const UnAuthRoute: React.FC<RouteProps> = ({ ...props }) => {
  const [isAuthenticated, isAuthenticatedSet] = useState<boolean | null>(null);
  useEffect(() => {
    axios({
      method: 'get', baseURL: process.env.REACT_APP_API_URL, url: '/adminers/refresh-tokens',
    }).then((response) => {
      isAuthenticatedSet(response.status === 200);
    }).catch(() => {
      isAuthenticatedSet(false);
    });
  }, []);

  if (isAuthenticated === null) {
    return <></>;
  }

  if (isAuthenticated && props.location?.pathname === '/login') {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return <Route {...props} />;
};

const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const [isAuthenticated, isAuthenticatedSet] = useState<boolean | null>(null);
  useEffect(() => {
    axios({
      method: 'get', baseURL: process.env.REACT_APP_API_URL, url: '/adminers/refresh-tokens',
    }).then((response) => {
      isAuthenticatedSet(response.status === 200);
    }).catch(() => {
      isAuthenticatedSet(false);
    });
  }, []);

  if (isAuthenticated === null) {
    return <></>;
  }

  if (isAuthenticated) {
    return <Route {...props} />;
  }

  return <Redirect to={{ pathname: '/login', state: { from: props.location?.pathname } }} />;
};

const App: React.FC = () => (
  <Router>
    <CurrentAdminerProvider>
      <AuthAdminerProvider>
        <Switch>
          <UnAuthRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </AuthAdminerProvider>
    </CurrentAdminerProvider>
  </Router>
);

export default App;
