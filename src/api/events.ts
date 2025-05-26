const API_BASE = 'http://localhost:3000/events';

export function fetchAllEvents() {
  return fetch(API_BASE)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to load events');
      }
      return res.json();
    });
}

export function fetchEventById(id: number) {
  return fetch(`${API_BASE}/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Event not found');
      }
      return res.json();
    });
}

export function signupToEvent(eventId: number) {
  return fetch(`${API_BASE}/${eventId}/signup`, {
    method: 'POST',
    credentials: 'include'
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to sign up');
      }
      return res.json();
    });
}

export {};