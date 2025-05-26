import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

interface TicketmasterEvent {
  id: string;
  name: string;
  dates: { start: { localDate: string } };
  images: { url: string }[];
}

const API_KEY = 'PUdXTy4cZ7rsJPJMxfUfJG0msbZHG3Lp';

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
        LVP Events is a web application designed to help users explore, create, and manage events in Liverpool with ease.
      </p>
      <p className={styles.introduction}>
        Whether you're looking to attend community gatherings, professional meet-ups, or cultural festivals, our platform connects people through shared experiences.
      </p>
      <p className={styles.introduction}>
        Built with usability and community in mind, LVP Events simplifies the way we connect, celebrate, and come together.
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