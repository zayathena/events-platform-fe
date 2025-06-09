export function getUserEvents() {
  return fetch('http://localhost:5000/api/users/me/events/', {
    credentials: 'include',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch user events');
      }
      return res.json(); 
    });
}

export function signupToTicketmasterEvent(eventId: string) {
  return fetch(`http://localhost:5000/api/events/${eventId}/signup`, {
    method: 'POST',
    credentials: 'include'
  }).then(res => {
    if (!res.ok) throw new Error('Failed to sign up');
    return res.json();
  });
}