'use client';

import { getFullDate, getLongDate, getTimeString } from '@/utils/functions';
import Overlay from '@/utils/globalComponents/Overlay';
import { useState } from 'react';
import BookingForm from './bookingForm/BookingForm';
import Link from 'next/link';
import WaitingListForm from './WaitlistForm';
import useFetchEvent from '@/hooks/events/useFetchEvent';
import { EventDateTime } from '@/utils/types/events';

interface Props {
  eventId: number;
}

const SingleEventDetails = ({ eventId }: Props) => {
  const [bookingFormOpen, setBookingFormOpen] = useState<boolean>(false);

  const { data: event, error, status } = useFetchEvent(eventId);

  if (status == 'loading') {
    return <h2 className="center">Loading...</h2>;
  }

  if (error || !event) {
    return (
      <h2 className="center error">
        I&apos;m sorry, we couldn&apos;t find this event
      </h2>
    );
  }

  return (
    <main>
      <h1 className="page-title">{event.title}</h1>
      <section className="single-event">
        {event.isFree && (
          <h2 className="single-event-free">
            This event is FREE! Just turn up and have fun
          </h2>
        )}
        {event.ticketsRemaining == 0 && (
          <h2 className="single-event-free">
            We&apos;re sorry, this class is full. Click the button below to join
            the waiting list
          </h2>
        )}
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
            {event.dateTimes.map((item: EventDateTime, index: number) => (
              <p key={index}>{`${getFullDate(item.date)}  ${getTimeString(
                item.startTime
              )} - ${getTimeString(item.endTime)}`}</p>
            ))}
          </div>
        </div>

        <div className="button-container">
          {!event.isFree ? (
            <button
              onClick={() => setBookingFormOpen(true)}
              className="btn btn-primary"
            >
              {event.ticketsRemaining! > 0
                ? 'Book Tickets'
                : 'Join Waiting List'}
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
                {event.dateTimes.map((item: EventDateTime, index: number) => (
                  <h4 key={index}>{`${getLongDate(item.date)} ${
                    item.startTime
                  } - ${item.endTime}`}</h4>
                ))}
              </div>
            ) : null
          }
        >
          {event ? (
            event.ticketsRemaining! > 0 ? (
              <BookingForm event={event} />
            ) : (
              <WaitingListForm event={event} />
            )
          ) : null}
        </Overlay>
      </section>
    </main>
  );
};

export default SingleEventDetails;
