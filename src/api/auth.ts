const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/auth`;

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

export function loginUser(email: string, password: string) {
  return fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',  
    body: JSON.stringify({ email, password }),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Login failed');
      }
      return res.json();
    });
}

export function fetchCurrentUser() {
  return fetch(`${API_BASE}/me`, {
    credentials: 'include', 
  }).then(res => {
    if (!res.ok) {
      throw new Error('Not authenticated');
    }
    return res.json();
  });
}