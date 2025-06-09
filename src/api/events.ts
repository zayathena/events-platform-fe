const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/events`;

export function fetchAllEvents() {
  return fetch(API_BASE, { credentials: 'include' })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to load events');
      }
      return res.json();
    });
}

export function fetchEventById(id: number) {
  return fetch(`${API_BASE}/${id}`, { credentials: 'include' })
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

export function createEvent(eventData: {
  title: string;
  description: string;
  image_url: string;
  start_time: string;
  end_time: string;
}) {
  return fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include', 
    body: JSON.stringify(eventData)
  }).then(res => {
    if (!res.ok) throw new Error('Failed to create event');
    return res.json();
  });
}

export {};