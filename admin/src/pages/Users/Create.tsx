import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';

const UsersCreate = () => {
  const history = useHistory();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const store = async () => {
    const response = await axios({
      method: 'post',
      baseURL: process.env.REACT_APP_API_URL,
      url: '/users',
      data: {
        name, email, password, confirmPassword,
      },
    });

    if (response.status === 201) {
      history.push('/users');
    }
  };

  return (
    <>
      <h1>UsersCreate</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirmPassword" />
      <button type="button" onClick={() => store()}>登録</button>
    </>
  );
};

export default withRouter(UsersCreate);
