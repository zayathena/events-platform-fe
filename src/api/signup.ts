const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/events`;

export function signupToTicketmasterEvent(eventId: string) {
  return fetch(`${API_BASE}/${eventId}/signup`, {
    method: 'POST',
    credentials: 'include'
  }).then(res => {
    if (!res.ok) throw new Error('Failed to sign up');
    return res.json();
  });
}