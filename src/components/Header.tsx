import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Events Platform</h1>
      <nav>
        <ul className={styles.navList}>
          <li><a href="/" className={styles.navItem}>Home</a></li>
          <li><a href="/events" className={styles.navItem}>Events</a></li>
          <li><a href="/create" className={styles.navItem}>Create Event</a></li>
          <li><a href="/login" className={styles.navItem}>Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;