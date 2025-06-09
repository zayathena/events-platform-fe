const TM_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/ticketmaster`;

export function fetchTicketmasterEvents() {
  return fetch(`${TM_BASE}/events`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch Ticketmaster events');
      }
      return res.json();
    });
}