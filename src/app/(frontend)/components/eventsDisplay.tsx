'use client';

import {
  convertToArray,
  getLongDate,
  getShortDate,
  trimString,
} from '@/lib/functions';
import Overlay from '@/lib/globalComponents/Overlay';
import { EventsData } from '@/lib/interfaces';
import BookingForm from './bookingForm/bookingForm';
import { useState } from 'react';

const EventsDisplay = () => {
  const [bookingFormEvent, setBookingFormEvent] = useState<EventsData | null>(
    null
  );
  const [bookingFormOpen, setBookingFormOpen] = useState<boolean>(false);
  const newEventsData = convertToArray([]);

  const showBookingForm = (id: any) => {};
  return (
    <section className="events-container">
      <h1>Our Upcoming Events</h1>
      {newEventsData.map((event: EventsData) => {
        return (
          <article className="event" key={event.id}>
            <div className="event-date-time">
              <p>
                {event.dateTimes.length < 2
                  ? getShortDate(event.dateTimes[0].date)
                  : `${getShortDate(event.dateTimes[0].date)} - ${getShortDate(
                      event.dateTimes[event.dateTimes.length - 1].date
                    )}`}
              </p>
              <h3>
                {`${event.dateTimes[0].startTime} - ${event.dateTimes[0].endTime}`}{' '}
              </h3>
            </div>
            <div className="event-summary">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">
                {trimString(event.description, 100)}
              </p>
            </div>
            <div className="event-buttons">
              <button
                className="btn btn-primary"
                onClick={(e) => showBookingForm(event.id)}
              >
                Book Tickets
              </button>
              <a href="#" className="btn btn-secondary">
                Learn more
              </a>
            </div>
          </article>
        );
      })}

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
    </section>
  );
};

export default EventsDisplay;
