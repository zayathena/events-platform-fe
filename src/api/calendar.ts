const CALENDAR_BASE = `${process.env.REACT_APP_API_BASE_URL}/calendar`;

export function redirectToGoogleAuth() {
  window.location.href = `${CALENDAR_BASE}/google-auth`;
}

export function addToGoogleCalendar(eventData: any) {
  return fetch(`${CALENDAR_BASE}/add-event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ eventData })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to add to calendar');
      }
      return res.json();
    });
}

export function getGoogleCalendarUrl(eventId: number) {
  return fetch(`${CALENDAR_BASE}/add-to-calendar/${eventId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to get calendar URL');
      }
      return res.json();
    });
}