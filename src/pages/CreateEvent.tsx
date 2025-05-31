import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/events';
import styles from './CreateEvent.module.css';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createEvent({
      title,
      description,
      start_time: startTime,
      end_time: endTime,
      image_url: imageUrl,
    })
      .then(() => {
        setMessage('Event created successfully!');
        setTitle('');
        setDescription('');
        setImageUrl('');
        setStartTime('');
        setEndTime('');
        navigate('/our-events');
      })
      .catch((err: any) => {
        setMessage(`Failed to create event`);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Event</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          className={styles.input}
          required
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          className={styles.textarea}
        />
         <input
          type="url"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className={styles.input}
        />
        <label className={styles.label}>Start</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
          className={styles.input}
          required
        />
        <label className={styles.label}>Finish</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Create Event</button>
        {message && (
          <p className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateEvent;