import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLogin } from '../context/AuthUser';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <div>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <button type="button" onClick={handleLogin}>ログイン</button>
      <button type="button" onClick={() => history.push('/')}>ホームへアクセスしてみる</button>
    </div>
  );
};

export default Login;
