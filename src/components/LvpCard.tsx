import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchEventById } from '../api/events';
import styles from './LvpCard.module.css';

interface OurEvent {
  id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  image_url?: string;
}

function generateGoogleCalendarUrl(event: OurEvent) {
  const formatDate = (datetime: string) =>
    new Date(datetime).toISOString().replace(/[-:]|(\.\d{3})/g, '');

  const startDate = formatDate(event.start_time);
  const endDate = formatDate(event.end_time);

  const text = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description || '');
  const dates = `${startDate}/${endDate}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`;
}

export default function OurEventCard() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<OurEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStaff, setIsStaff] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!id) return;
    fetchEventById(Number(id))
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Event not found.');
        setLoading(false);
      });
  }, [id]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/me', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(user => {
        setIsStaff(user?.role === 'staff');
      })
      .catch(() => setIsStaff(false));
  }, []);

  const handleDelete = () => {
    if (!event) return;

    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    fetch(`${API_BASE_URL}/api/events/${event.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete event");
        }
        alert("Event deleted successfully");
        navigate('/our-events');
      })
      .catch((err) => {
        alert(err.message || "Error deleting event");
      });
  };

  const handleSignUp = () => {
  if (!event) return;

  fetch(`http://localhost:5000/api/events/${event.id}/signup`, {
    method: 'POST',
    credentials: 'include',
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to sign up for event');
      }
      return res.json();
    })
    .then(() => {
      alert('Successfully signed up!');
      setIsSignedUp(true); 
    })
    .catch(err => {
      alert(err.message || 'Error signing up');
    });
};

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>No event found.</p>;

  const calendarUrl = generateGoogleCalendarUrl(event);

return (
    <div className={styles.container}>
      <Link to="/our-events" className={styles.backLink}>
        ← Back to Our Events
      </Link>

      <h1>{event.title}</h1>
      {event.image_url && (
        <img src={event.image_url} alt={event.title} className={styles.image} />
      )}

      <p><strong>Start:</strong> {new Date(event.start_time).toLocaleString()}</p>
      <p><strong>End:</strong> {new Date(event.end_time).toLocaleString()}</p>
      {event.description && <p><strong>Description:</strong> {event.description}</p>}

      <div>
        {!isStaff && (
          !isSignedUp ? (
          <button
            onClick={handleSignUp}
            className={`${styles.button} ${styles.signUpButton}`}
          >
            ✅ Sign Up for Event
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
            <p className={styles.signupSuccess}>You’ve signed up successfully!</p>
          </>
        )
        )}

        {isStaff && (
          <button
            onClick={handleDelete}
            className={`${styles.button} ${styles.deleteButton}`}
          >
            🗑️ Delete Event
          </button>
        )}
      </div>
    </div>
  );
}