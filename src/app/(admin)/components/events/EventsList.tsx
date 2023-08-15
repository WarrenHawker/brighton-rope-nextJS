'use client';
import { EventDBAdmin } from '@/utils/types/events';
import { getFullDate } from '../../../../utils/functions';

interface EventsListProps {
  events: EventDBAdmin[];
  selectedEvent: EventDBAdmin | null;
  changeSelectedEvent: (id: number) => void;
}

const EventsList = ({
  events,
  selectedEvent,
  changeSelectedEvent,
}: EventsListProps) => {
  return (
    <>
      <h2>Events List</h2>
      <select
        className="events-selector"
        onChange={(e) => changeSelectedEvent(parseInt(e.target.value))}
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
          {events.map((event: EventDBAdmin) => (
            <tr
              onClick={() => changeSelectedEvent(event.id)}
              key={event.id}
              className={
                selectedEvent?.id == event.id ? 'selected' : 'not-selected'
              }
            >
              <td>{event.title}</td>
              <td>{getFullDate(event.startDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EventsList;
