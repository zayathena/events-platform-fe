interface Venue {
  name?: string;
  city?: { name?: string };
}

interface EventDates {
  start: {
    localDate: string;
  };
}

interface Event {
  name: string;
  info?: string;
  dates: EventDates;
  _embedded?: {
    venues?: Venue[];
  };
}

export function generateGoogleCalendarUrl(event: Event) {
  const startDate = event.dates.start.localDate.replace(/-/g, '');
  const endDate = startDate;

  const text = encodeURIComponent(event.name);
  const dates = `${startDate}/${endDate}`;
  const details = encodeURIComponent(event.info || '');
  const location = encodeURIComponent(
    event._embedded?.venues?.[0]
      ? `${event._embedded.venues[0].name}, ${event._embedded.venues[0].city?.name || ''}`
      : ''
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}
