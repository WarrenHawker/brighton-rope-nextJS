'use client';

import { getFullDate, getLongDate, getTimeString } from '@/lib/functions';
import Overlay from '@/lib/globalComponents/Overlay';
import { EventsData } from '@/lib/interfaces';
import { useState } from 'react';
import BookingForm from './bookingForm/bookingForm';
import Link from 'next/link';
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

interface Props {
  event: EventsData;
}

const SingleEventDetails = ({ event }: Props) => {
  const [bookingFormOpen, setBookingFormOpen] = useState<boolean>(false);

  return (
    <section className="single-event">
      {!event.prices.length ? (
        <h2 className="single-event-free">
          This event is FREE! Just turn up and have fun
        </h2>
      ) : null}
      <div className="single-event-details">
        <div className="single-event-location">
          <h3>Location:</h3>
          <p>{event.location.lineOne}</p>
          <p>{event.location.lineTwo}</p>
          <p>{event.location.city}</p>
          <p>{event.location.country}</p>
          <p>{event.location.postcode}</p>
        </div>

        <div className="single-event-date-times">
          <h3>Dates and Times:</h3>
          {event.dateTimes.map((item, index) => (
            <p key={index}>{`${getFullDate(item.date)}  ${getTimeString(
              item.startTime
            )} - ${getTimeString(item.endTime)}`}</p>
          ))}
        </div>
      </div>

      <MdPreview modelValue={event.description} />

      <div className="button-container">
        {event.prices.length ? (
          <button
            onClick={() => setBookingFormOpen(true)}
            className="btn btn-primary"
          >
            Book Tickets
          </button>
        ) : null}
        <Link href="/events" className="btn btn-secondary">
          All Events
        </Link>
      </div>
      <Overlay
        isOpen={bookingFormOpen}
        setIsOpen={setBookingFormOpen}
        header={
          event ? (
            <div className="event-info">
              <h3>{event.title}</h3>
              {event.dateTimes.map((item, index) => (
                <h4 key={index}>{`${getLongDate(item.date)} ${
                  item.startTime
                } - ${item.endTime}`}</h4>
              ))}
            </div>
          ) : null
        }
      >
        {event ? <BookingForm event={event} /> : null}
      </Overlay>
    </section>
  );
};

export default SingleEventDetails;
