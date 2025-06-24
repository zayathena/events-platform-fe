import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Events.module.css'; 
import { fetchAllEvents } from '../api/events';

interface LocalEvent {
  id: number;
  title: string;
  image_url: string;
  start_time: string;
}

export default function OurEvents() {
  const [events, setEvents] = useState<LocalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllEvents()
      .then(data => {
         const today = new Date();
         today.setHours(0, 0, 0, 0);

         const upcomingEvents = data.filter((event: LocalEvent) => {
          const eventDate = new Date(event.start_time);
          return eventDate.getTime() >= today.getTime();
        });

        setEvents(upcomingEvents);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading local events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
  <div className={styles.container}>
    <h1>Events by LVP</h1>
    <ul className={styles.eventList}>
      {events.map((event: LocalEvent) => {
        const imageUrl = event.image_url || '';
        return (
          <li key={event.id} className={styles.eventCard}>
            <Link to={`/our-events/${event.id}`}>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={event.title}
                  className={styles.eventImage}
                />
              )}
            </Link>
            <div className={styles.eventDetails}>
              <Link to={`/our-events/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <strong className={styles.eventTitle}>{event.title}</strong>
              </Link>
              <br />
              <small className={styles.eventDate}>
                {new Date(event.start_time).toLocaleDateString()}
              </small>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);
}