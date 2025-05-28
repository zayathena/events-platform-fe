const TM_BASE = 'http://localhost:5000/ticketmaster';

export function fetchTicketmasterEvents() {
  return fetch(`${TM_BASE}/events`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch Ticketmaster events');
      }
      return res.json();
    });
}