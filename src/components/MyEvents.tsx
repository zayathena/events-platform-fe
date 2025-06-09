import React, { useEffect, useState } from 'react';
import { getUserEvents } from '../api/userEvents';

interface CustomEvent {
  id: number;
  title: string;
  start_time: string;
  location: string;
}

const MyEvents = () => {
  const [customEvents, setCustomEvents] = useState<CustomEvent[]>([]);
  const [ticketmasterEventIds, setTicketmasterEventIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserEvents()
      .then((data) => {
        setCustomEvents(data.customEvents || []);
        setTicketmasterEventIds(data.ticketmasterEventIds || []);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load events');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (customEvents.length === 0 && ticketmasterEventIds.length === 0) {
    return <p>You haven’t signed up for any events yet.</p>;
  }

  return (
    <div className="container">
      <h2>My Events</h2>

      {customEvents.length > 0 && (
        <>
          <ul>
            {customEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong> – {new Date(event.start_time).toLocaleDateString()}
                <br />
                {event.location || 'No location provided'}
              </li>
            ))}
          </ul>
        </>
      )}

      {ticketmasterEventIds.length > 0 && (
        <>
          <ul>
            {ticketmasterEventIds.map((id) => (
              <li key={id}>
                Ticketmaster Event ID: <strong>{id}</strong>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MyEvents;