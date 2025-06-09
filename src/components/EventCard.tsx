import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { signupToTicketmasterEvent } from '../api/signup';
import styles from './EventCard.module.css';

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
  const [signedUp, setSignedUp] = useState(false);

  const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;

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
    setSignupMessage(null);

    signupToTicketmasterEvent(event.id)
      .then(() => {
        alert('Successfully signed up!');
        setSignedUp(true);
      })
      .catch(() => {
        alert('Error signing up');
        setSignedUp(false);
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
    <div className={styles.container}>
      <Link to="/events" className={styles.backLink}>
        ← Back to events
      </Link>

      <h1 className={styles.title}>{event.name}</h1>

      {imageUrl && (
        <img src={imageUrl} alt={event.name} className={styles.image} />
      )}

      <p><strong>Date:</strong> {new Date(event.dates.start.localDate).toLocaleDateString()}</p>

      {event._embedded?.venues && (
        <p>
          <strong>Venue:</strong> {event._embedded.venues[0].name}, {event._embedded.venues[0].city?.name}
        </p>
      )}

      {event.info && <p><strong>Info:</strong> {event.info}</p>}

      {!signedUp ? (
        <button
          onClick={handleSignup}
          disabled={signingUp}
          className={`${styles.button} ${signingUp ? styles.disabledButton : styles.signUpButton}`}
        >
          {signingUp ? 'Signing up...' : '✅ Sign Up for This Event'}
        </button>
      ) : (
        <>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} ${styles.googleCalendarButton}`}
          >
            + Add to Google Calendar
          </a>
          {signupMessage && (
            <p className={styles.signupSuccess}>{signupMessage}</p>
          )}
        </>
      )}

      {!signedUp && signupMessage && (
        <p className={styles.signupMessageError}>{signupMessage}</p>
      )}
    </div>
  );
}