const API_BASE = 'http://localhost:5000/api/auth';

export function registerUser(email: string, password: string, role: string) {
  return fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', 
    body: JSON.stringify({ email, password, role }),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to register user');
      }
      return res.json();
    });
}