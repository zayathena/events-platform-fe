import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

interface TicketmasterEvent {
  id: string;
  name: string;
  dates: { start: { localDate: string } };
  images: { url: string }[];
}

const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;

const Home = () => {
  const [events, setEvents] = useState<TicketmasterEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&city=Liverpool`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
      })
      .then(data => {
        if (!data._embedded || !data._embedded.events) {
          setEvents([]);
          setLoading(false);
          return;
        }
  
        const sortedEvents = data._embedded.events.sort((a: TicketmasterEvent, b: TicketmasterEvent) => {
          return new Date(a.dates.start.localDate).getTime() - new Date(b.dates.start.localDate).getTime();
        });

        setEvents(sortedEvents.slice(0, 6));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading upcoming events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome To LVP Events</h1>
      <p className={styles.introduction}>
        LVP Events is your go-to platform for discovering, creating, and managing events across Liverpool. Whether you're into vibrant cultural festivals, professional networking meetups, or local community gatherings, we've got something for everyone.
      </p>
      <p className={styles.introduction}>
        Think of it as a mix between Ticketmaster’s big-name events and exclusive local experiences you won’t find anywhere else — all in one easy-to-use platform.
      </p>
      <p className={styles.introduction}>
        Built with community and connection in mind, LVP Events makes it simple to explore what’s happening around you, bring people together, and celebrate the spirit of Liverpool.
      </p>

      <h2 className={styles.title}>Upcoming Events</h2>

      <ul className={styles.eventList}>
        {events.map(event => {
          const imageUrl = event.images?.[0]?.url || '';
          return (
            <li key={event.id} className={styles.eventCard}>
              <Link to={`/events/${event.id}`} className={styles.eventLink}>
                {imageUrl && <img src={imageUrl} alt={event.name} className={styles.eventImage} />}
                <div className={styles.eventInfo}>
                  <strong>{event.name}</strong><br />
                  <small>{new Date(event.dates.start.localDate).toLocaleDateString()}</small>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;