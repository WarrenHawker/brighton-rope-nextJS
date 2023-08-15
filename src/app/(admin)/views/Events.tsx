'use client';
import Overlay from '@/utils/globalComponents/Overlay';
import ViewTabs from '@/utils/globalComponents/ViewTabs';
import { useEffect, useState } from 'react';
import BookingsList from '../components/bookings/BookingsList';
import EventDetails from '../components/events/EventDetails';
import EventsList from '../components/events/EventsList';
import useFetchEvents from '@/hooks/events/useFetchEvents';
import AddEditEvent from '../components/events/AddEditEvent';
import Waitlist from '../components/waitlists/waitlists';

const AdminEvents = () => {
  const [addEvent, setAddEvent] = useState<boolean>(false);
  const [view, setView] = useState<string>('Details');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { data: events, error, status } = useFetchEvents();

  const changeSelectedEvent = (id: number) => {
    setSelectedEvent(events.filter((event: any) => event.id == id)[0]);
  };

  useEffect(() => {
    if (events) {
      setSelectedEvent(events[0]);
    }
  }, [events]);

  if (status == 'loading') {
    return (
      <>
        <h1 className="page-title">Events</h1>
        <h3 className="center">Loading...</h3>
      </>
    );
  }

  if (status == 'error') {
    return (
      <>
        <h1 className="page-title">Events</h1>
        <div>
          <h3 className="center error">{(error as Error).message}</h3>
          <h2>Add New Event</h2>
          <AddEditEvent setActive={setAddEvent} />
        </div>
      </>
    );
  }

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
          children={<AddEditEvent setActive={setAddEvent} />}
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
