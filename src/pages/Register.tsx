import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

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
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <h2>Register</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      />
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      >
        <option value="user">User</option>
        <option value="staff">Staff</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '0.6rem 1.2rem',
          backgroundColor: loading ? '#aaa' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
        }}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
      {message && (
        <p
          style={{
            marginTop: '0.5rem',
            color: message.startsWith('Success') ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default Register;