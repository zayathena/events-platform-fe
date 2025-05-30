import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { signupToTicketmasterEvent } from '../api/signup';

interface TicketmasterEvent {
  id: string;
  name: string;
  info?: string;
  dates: {
    start: {
      localDate: string;
      localTime?: string;
    };
  };
  images: { url: string }[];
  _embedded?: {
    venues?: { name: string; city?: { name: string } }[];
  };
}

function generateGoogleCalendarUrl(event: TicketmasterEvent) {
  const startDate = event.dates.start.localDate.replace(/-/g, '');
  const endDate = startDate; 

  const text = encodeURIComponent(event.name);
  const dates = `${startDate}/${endDate}`;
  const details = encodeURIComponent(event.info || '');
  const location = encodeURIComponent(
    event._embedded?.venues?.[0]
      ? `${event._embedded.venues[0].name}, ${event._embedded.venues[0].city?.name || ''}`
      : ''
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

export default function EventCard() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<TicketmasterEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [signupMessage, setSignupMessage] = useState<string | null>(null);
  const [signingUp, setSigningUp] = useState(false);

  const API_KEY = 'PUdXTy4cZ7rsJPJMxfUfJG0msbZHG3Lp';

  useEffect(() => {
    if (!id) return;
    fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`)
      .then(res => {
        if (!res.ok) throw new Error('Event not found');
        return res.json();
      })
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

   const handleSignup = () => {
    if (!event) return;
    setSigningUp(true);
    signupToTicketmasterEvent(event.id)
      .then(() => {
        setSignupMessage('Successfully signed up!');
      })
      .catch(() => {
        setSignupMessage('Sign up failed. Please try again.');
      })
      .finally(() => {
        setSigningUp(false);
      });
  };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>No event found.</p>;

  const imageUrl = event.images?.[0]?.url || '';
  const calendarUrl = generateGoogleCalendarUrl(event);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <Link to="/events" style={{ display: 'inline-block', marginBottom: '1rem' }}>
        ← Back to events
      </Link>

      <h1>{event.name}</h1>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={event.name}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
        />
      )}
      <p><strong>Date:</strong> {new Date(event.dates.start.localDate).toLocaleDateString()}</p>

      {event._embedded?.venues && (
        <p>
          <strong>Venue:</strong> {event._embedded.venues[0].name}, {event._embedded.venues[0].city?.name}
        </p>
      )}

      {event.info && <p><strong>Info:</strong> {event.info}</p>}
      
        <button
        onClick={handleSignup}
        disabled={signingUp}
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.6rem 1.2rem',
          backgroundColor: '#4285F4',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {signingUp ? 'Signing up...' : 'Sign Up for This Event'}
      </button>

      {signupMessage && (
        <p style={{ marginTop: '0.5rem', color: signupMessage.includes('failed') ? 'red' : 'green' }}>
          {signupMessage}
        </p>
      )}

      <a
        href={calendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.6rem 1.2rem',
          backgroundColor: '#4285F4',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        + Add to Google Calendar
      </a>
    </div>
  );
}