'use client';
import Overlay from '@/lib/globalComponents/Overlay';
import { EventsData } from '@/lib/interfaces';
import { useEvents } from '@/context/EventsContext';
import { useState } from 'react';
import { getLongDate } from '@/lib/functions';
import BookingForm from './components/bookingForm/bookingForm';
import EventsDisplay from './components/eventsDisplay';

const HomePage = () => {
  const [bookingFormEvent, setBookingFormEvent] = useState<EventsData | null>(
    null
  );
  const [bookingFormOpen, setBookingFormOpen] = useState<boolean>(false);
  const { events } = useEvents();

  const showBookingForm = (id: string) => {
    setBookingFormEvent(events.filter((event) => event.id == id)[0]);
    setBookingFormOpen(true);
  };

  return (
    <>
      <main>
        <EventsDisplay showBookingForm={showBookingForm} />
      </main>
      <Overlay
        isOpen={bookingFormOpen}
        setIsOpen={setBookingFormOpen}
        header={
          bookingFormEvent ? (
            <div className="event-info">
              <h3>{bookingFormEvent.title}</h3>
              {bookingFormEvent.dateTimes.map((item, index) => (
                <h4 key={index}>{`${getLongDate(item.date)} ${
                  item.startTime
                } - ${item.endTime}`}</h4>
              ))}
            </div>
          ) : null
        }
      >
        {bookingFormEvent ? (
          <BookingForm eventId={bookingFormEvent.id} />
        ) : null}
      </Overlay>
    </>
  );
};

export default HomePage;
