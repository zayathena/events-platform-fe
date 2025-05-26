import styles from './Home.module.css';

const Home = () => 

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
  </div>

export default Home;