'use client';
import { getFullDate } from '../../../../lib/functions';

const EventsList = () => {
  return (
    <>
      <h2>Events List</h2>
      <select
        className="events-selector"
        onChange={(e) => setSelectedEvent(e.target.value)}
      >
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.title}
          </option>
        ))}
      </select>
      <table className="main-table events-list">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr
              onClick={() => setSelectedEvent(event.id)}
              key={event.id}
              className={
                selectedEvent == event.id ? 'selected' : 'not-selected'
              }
            >
              <td>{event.title}</td>
              <td>{getFullDate(event.dateTimes[0].date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EventsList;
