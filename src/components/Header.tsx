import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assests/logo.png';
import { useState } from 'react';

const Header = () => {
  const { user, setUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/auth/me', { credentials: 'include' })
  //     .then(res => {
  //       if (!res.ok) throw new Error('Not authenticated');
  //       return res.json();
  //     })
  //     .then(data => setUser(data))
  //     .catch(() => setUser(null));
  // }, []);

  const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/auth`;

  const handleLogout = () => {
    fetch(`${API_BASE}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => setUser(null));
  };

return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logoLink}>
            <img src={logo} alt="LVP Events Logo" className={styles.logo} />
          </Link>

          <h1 className={styles.title}>
            <Link to="/" className={styles.titleLink}>LVP EVENTS</Link>
          </h1>
        </div>

        {/* Desktop */}
        <nav className={`${styles.nav} ${styles.desktopNav}`}>
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
                <li><span className={styles.navItem}>👤 {user.firstName || user.email}</span></li>
                <li>
                  <button onClick={handleLogout} className={`${styles.navItem} ${styles.logoutButton}`}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        
        <button className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Mobile */}
      {isMenuOpen && (
        <nav className={styles.mobileNav}>
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
                <li><span className={styles.navItem}>👤 {user.firstName || user.email}</span></li>
                <li>
                  <button onClick={handleLogout} className={`${styles.navItem} ${styles.logoutButton}`}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;