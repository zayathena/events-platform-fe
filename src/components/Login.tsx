import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:3000/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
      })
      .then(() => {
        navigate('/events'); 
      })
      .catch(err => {
        console.error(err);
        setError('Invalid email or password');
      });
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />

      <button type="submit" style={{ padding: '0.5rem 1rem' }}>
        Login
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}