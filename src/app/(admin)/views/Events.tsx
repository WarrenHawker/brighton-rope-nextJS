'use client';
import Overlay from '@/utils/globalComponents/Overlay';
import ViewTabs from '@/utils/globalComponents/ViewTabs';
import { useEffect, useState } from 'react';
// import 'md-editor-rt/lib/style.css';
import { EventsData } from '@/utils/interfaces';
import { useQuery } from '@tanstack/react-query';
import { fetchEventsClient } from '@/utils/clientFetch';
import BookingsList from '../components/bookings/BookingsList';
import AddEvent from '../components/events/AddEvent';
import EventDetails from '../components/events/EventDetails';
import EventsList from '../components/events/EventsList';
import Waitlist from '../components/waitlists/Waitlists';

const AdminEvents = () => {
  const [addEvent, setAddEvent] = useState<boolean>(false);
  const [view, setView] = useState<string>('Details');
  const [events, setEvents] = useState<EventsData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null);

  const { data } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEventsClient(),
  });

  useEffect(() => {
    if (data) {
      setEvents(data);
      setSelectedEvent(data[0]);
    }
  }, [data]);

  const changeSelectedEvent = (id: string) => {
    setSelectedEvent(events.filter((event) => event.id == id)[0]);
  };

  return (
    <>
      <h1 className="page-title">Events</h1>
      <aside>
        <button className="btn btn-large" onClick={() => setAddEvent(true)}>
          Create New Event
        </button>

        <Overlay
          isOpen={addEvent}
          setIsOpen={setAddEvent}
          header={<h2>Add New Event</h2>}
          // eslint-disable-next-line react/no-children-prop
          children={<AddEvent setAddEvent={setAddEvent} />}
        />
        <EventsList
          events={events}
          selectedEvent={selectedEvent}
          changeSelectedEvent={changeSelectedEvent}
        />
      </aside>

      <main>
        <ViewTabs
          tabs={['Details', 'Bookings', 'Waiting List']}
          currentTab={view}
          changeTab={setView}
          // eslint-disable-next-line react/no-children-prop
          children={[
            {
              name: 'Details',
              element: <EventDetails selectedEvent={selectedEvent} />,
            },
            {
              name: 'Bookings',
              element: (
                <BookingsList selectedEvent={selectedEvent} events={events} />
              ),
            },
            {
              name: 'Waiting List',
              element: <Waitlist selectedEvent={selectedEvent} />,
            },
          ]}
        />
      </main>
    </>
  );
};

export default AdminEvents;
