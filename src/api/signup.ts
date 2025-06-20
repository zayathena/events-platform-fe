export function signupToTicketmasterEvent(eventId: string) {
  return fetch(`${process.env.REACT_APP_API_BASE}/events/${eventId}/signup`, {
    method: 'POST',
    credentials: 'include'
  }).then(res => {
    if (!res.ok) throw new Error('Failed to sign up');
    return res.json();
  });
}

