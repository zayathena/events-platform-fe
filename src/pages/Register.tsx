import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import styles from './Register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    registerUser(email, password, role)
      .then(res => {
        setMessage(`Success: ${res.message}`);
        setTimeout(() => navigate('/login'), 1500);
      })
      .catch(err => setMessage(`Error: ${err.message}`))
      .finally(() => setLoading(false));
  };

  return (
  <form onSubmit={handleSubmit} className={styles.container}>
    <h2>Register</h2>

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

    <select
      value={role}
      onChange={e => setRole(e.target.value)}
      className={styles.inputsu}
    >
      <option value="user">User</option>
      <option value="staff">Staff</option>
    </select>

    <button type="submit" disabled={loading} className={styles.button}>
      {loading ? 'Registering...' : 'Register'}
    </button>

    {message && (
      <p
        className={message.startsWith('Success') ? styles.success : styles.error}
      >
        {message}
      </p>
    )}
  </form>
);
};

export default Register;