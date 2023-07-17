'use client';
import Overlay from '@/lib/globalComponents/Overlay';
import ViewTabs from '@/lib/globalComponents/ViewTabs';
import { useState } from 'react';
import BookingsList from '../components/bookings/BookingsList';
import AddEvent from '../components/events/AddEvent';
import EventDetails from '../components/events/EventDetails';
import EventsList from '../components/events/EventsList';
import WaitingList from '../components/waitingList/WaitingList';
import 'md-editor-rt/lib/style.css';

const AdminHome = () => {
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
        {/* <EventsList /> */}
      </aside>

      {/* <main>
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
      </main> */}
    </>
  );
};

export default AdminHome;
