import React, { useState, useEffect } from 'react';
import { useHistory, withRouter, useParams } from 'react-router-dom';
import axios from 'axios';

const UsersEdit = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const show = async () => {
    const response = await axios({
      method: 'get',
      baseURL: process.env.REACT_APP_API_URL,
      url: `/users/${id}`,
    });

    if (response.status === 200) {
      setName(response.data.name);
      setEmail(response.data.email);
    }
  };

  useEffect(() => {
    show();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const update = async () => {
    const response = await axios({
      method: 'put',
      baseURL: process.env.REACT_APP_API_URL,
      url: `/users/${id}`,
      data: {
        name, email,
      },
    });

    if (response.status === 200) {
      history.push('/users');
    }
  };

  return (
    <>
      <h1>UsersEdit</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <button type="button" onClick={() => update()}>更新</button>
    </>
  );
};

export default withRouter(UsersEdit);
