import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to="/" className={styles.titleLink}>LVP</Link>
      </h1>
      <nav>
        <ul className={styles.navList}>
          <li><Link to="/" className={styles.navItem}>Home</Link></li>
          <li><Link to="/events" className={styles.navItem}>Events</Link></li>
          <li><Link to="/our-events" className={styles.navItem}>LVP Events</Link></li>
          <li><Link to="/create" className={styles.navItem}>Create Event</Link></li>
          <li><Link to="/login" className={styles.navItem}>Login</Link></li>
          <li><Link to="/register" className={styles.navItem}>Register</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;