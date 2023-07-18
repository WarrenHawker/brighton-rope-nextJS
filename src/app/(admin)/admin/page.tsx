'use client';
import Overlay from '@/lib/globalComponents/Overlay';
import ViewTabs from '@/lib/globalComponents/ViewTabs';
import { useEffect, useState } from 'react';
import BookingsList from '../components/bookings/BookingsList';
import AddEvent from '../components/events/AddEvent';
import EventDetails from '../components/events/EventDetails';
import EventsList from '../components/events/EventsList';
import WaitingList from '../components/waitingList/WaitingList';
import 'md-editor-rt/lib/style.css';
import { EventsData } from '@/lib/interfaces';

const AdminHome = () => {
  const [addEvent, setAddEvent] = useState<boolean>(false);
  const [view, setView] = useState<string>('Details');
  const [events, setEvents] = useState<EventsData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch(
      'http://localhost:3000/api/events?events=-1&old=true'
    );
    const data = await res.json();
    if (Array.isArray(data.events)) {
      const events = data.events.map((event: any) => {
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          location: JSON.parse(event.location),
          maxTickets: event.maxTickets,
          ticketsSold: event.ticketsSold,
          ticketsRemaining: event.ticketsRemaining,
          dateTimes: JSON.parse(event.dateTimes),
          allowMultipleTickets: event.allowMultipleTickets,
          prices: JSON.parse(event.prices),
        };
      });
      setEvents(events);
      setSelectedEvent(events[0]);
    } else setEvents([data]);
  };

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
          children={<AddEvent />}
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
              element: <BookingsList selectedEvent={selectedEvent} />,
            },
            { name: 'Waiting List', element: <WaitingList /> },
          ]}
        />
      </main>
    </>
  );
};

export default AdminHome;
