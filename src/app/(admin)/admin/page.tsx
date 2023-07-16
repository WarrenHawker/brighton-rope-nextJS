'use client';
import BookingsList from '@/components/admin/bookings/BookingsList';
import WaitingList from '@/components/admin/waitingList/WaitingList';
import AddEvent from '@/components/admin/events/AddEvent';
import EventDetails from '@/components/admin/events/EventDetails';
import EventsList from '@/components/admin/events/EventsList';
import Overlay from '@/components/global/Overlay';
import ViewTabs from '@/components/global/ViewTabs';
import { useState } from 'react';

export default function AdminHome() {
  const [addEvent, setAddEvent] = useState<boolean>(false);
  const [view, setView] = useState<string>('Details');
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
        <EventsList />
      </aside>

      <main>
        <ViewTabs
          tabs={['Details', 'Bookings', 'Waiting List']}
          currentTab={view}
          changeTab={setView}
          // eslint-disable-next-line react/no-children-prop
          children={[
            { name: 'Details', element: <EventDetails /> },
            { name: 'Bookings', element: <BookingsList /> },
            { name: 'Waiting List', element: <WaitingList /> },
          ]}
        />
      </main>
    </>
  );
}
