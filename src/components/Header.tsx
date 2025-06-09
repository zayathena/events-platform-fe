import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface User {
  id: number;
  email: string;
  firstName?: string;
  role?: string;
}

const Header = () => {
  const { user, setUser } = useAuth();

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/auth/me', { credentials: 'include' })
  //     .then(res => {
  //       if (!res.ok) throw new Error('Not authenticated');
  //       return res.json();
  //     })
  //     .then(data => setUser(data))
  //     .catch(() => setUser(null));
  // }, []);

  const handleLogout = () => {
    fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => setUser(null));
  };

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
          {user?.role === 'staff' && (
            <li><Link to="/create" className={styles.navItem}>Create Event</Link></li>
          )}
          {!user ? (
            <>
              <li><Link to="/login" className={styles.navItem}>Login</Link></li>
              <li><Link to="/register" className={styles.navItem}>Register</Link></li>
            </>
          ) : (
            <>
            <Link to="/my-events">
              <li className={styles.navItem}>👋 {user.firstName || user.email}</li></Link>
              <li><button onClick={handleLogout} className={styles.logoutButton}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;