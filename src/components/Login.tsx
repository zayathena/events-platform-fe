import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useAuth } from '../context/AuthContext';

const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/auth`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`${API_BASE}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
      })
      .then(data => {
        login(data.user);
        navigate('/'); 
      })
      .catch(err => {
        console.error(err);
        setError('Invalid email or password');
      });
  };

  return (
    <form onSubmit={handleLogin} className={styles.container}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        Login
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}