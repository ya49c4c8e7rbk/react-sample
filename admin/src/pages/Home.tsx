import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useLogout } from '../context/AuthAdminer';

const Home = () => {
  const history = useHistory();
  const logout = useLogout();

  return (
    <>
      <h1>ホーム</h1>
      <p>プライベートページです。ログインしていないユーザは見れません。</p>
      <div>
        <button type="button" onClick={logout}>ログアウトする</button>
        <button type="button" onClick={() => history.push('/login')}>/loginへアクセスしてみる</button>
      </div>
      <ul>
        <li><Link to="/users">UsersIndex</Link></li>
      </ul>
    </>
  );
};

export default Home;
