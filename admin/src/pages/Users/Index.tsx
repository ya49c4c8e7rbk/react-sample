import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersIndex = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('');

  const findAll = async (params: any) => {
    const response = await axios({
      method: 'get', baseURL: process.env.REACT_APP_API_URL, url: '/users', params,
    });

    setUsers(response.data);
  };

  useEffect(() => {
    findAll({ name });
  }, [name]);

  return (
    <>
      <h1>UsersIndex</h1>
      <div>
        <Link to="/users/create">新規作成</Link>
      </div>
      <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}
            {user.name}
            {user.email}
            <Link to={`/users/${user.id}/edit`}>編集</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersIndex;
