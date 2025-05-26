import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface TicketmasterEvent {
  id: string;
  name: string;
  dates: {
    start: {
      localDate: string;
    };
  };
  images: { url: string }[];
}

export default function Events() {
  const [events, setEvents] = useState<TicketmasterEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = 'PUdXTy4cZ7rsJPJMxfUfJG0msbZHG3Lp';
  const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&city=Liverpool&size=20`;

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
      })
      .then(data => {
        setEvents(data._embedded?.events || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Liverpool events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Events in Liverpool</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {events.map(event => {
          const imageUrl = event.images?.[0]?.url || '';
          return (
            <li key={event.id} style={{ marginBottom: '2em', display: 'flex', alignItems: 'center' }}>
              <Link to={`/events/${event.id}`}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={event.name}
                    style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '4px', marginRight: '1em' }}
                  />
                )}
              </Link>
              <div>
                <strong>{event.name}</strong>
                <br />
                <small>{new Date(event.dates.start.localDate).toLocaleDateString()}</small>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}