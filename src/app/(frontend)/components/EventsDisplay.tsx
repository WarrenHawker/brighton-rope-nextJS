'use client';

import {
  getLongDate,
  getShortDate,
  getTimeString,
  trimString,
} from '@/utils/functions';
import Overlay from '@/utils/globalComponents/Overlay';
import BookingForm from './bookingForm/BookingForm';
import { useState } from 'react';
import Link from 'next/link';
import WaitingListForm from './WaitlistForm';
import useFetchEvents from '@/hooks/events/useFetchEvents';
import { EventClient } from '@/utils/types/events';

interface EventsDisplayProps {
  page: string;
}

const EventsDisplay = ({ page }: EventsDisplayProps) => {
  let limit: number | undefined;
  if (page == 'home') {
    limit = 3;
  } else {
    limit = undefined;
  }
  const query = page == 'home' ? 'upcoming home' : 'upcoming all';
  const [bookingFormEvent, setBookingFormEvent] = useState<EventClient | null>(
    null
  );
  const [bookingFormOpen, setBookingFormOpen] = useState(false);

  const { data: events, status } = useFetchEvents({
    limit: limit,
    type: 'upcoming',
    queryKey: ['events', query],
  });

  const showBookingForm = (id: any) => {
    setBookingFormEvent(
      events.filter((event: EventClient) => event.id == id)[0]
    );
    setBookingFormOpen(true);
  };

  if (status == 'loading') {
    return <h3>Loading...</h3>;
  }

  if (!events) {
    return <h3>Loading...</h3>;
  }

  return (
    <section className="events-container">
      <h1>Our Upcoming Events</h1>
      {!events.length ? (
        <h2 className="center">I&apos;m sorry, there are no upcoming events</h2>
      ) : (
        <>
          {events.map((event: EventClient) => {
            return (
              <article className="event" key={event.id}>
                <div className="event-date-time">
                  <p>
                    {event.dateTimes.length < 2
                      ? getShortDate(event.dateTimes[0].date)
                      : `${getShortDate(
                          event.dateTimes[0].date
                        )} - ${getShortDate(
                          event.dateTimes[event.dateTimes.length - 1].date
                        )}`}
                  </p>
                  <h3>
                    {`${getTimeString(
                      event.dateTimes[0].startTime
                    )} - ${getTimeString(event.dateTimes[0].endTime)}`}{' '}
                  </h3>
                </div>
                <div className="event-summary">
                  <h2 className="event-title">{event.title}</h2>
                  <p className="event-description">
                    {trimString(event.description, 100)}
                  </p>
                </div>

                <div className="button-container">
                  {!event.isFree ? (
                    <button
                      className="btn btn-primary"
                      onClick={(e) => showBookingForm(event.id)}
                    >
                      {event.ticketsRemaining! > 0
                        ? 'Book Tickets'
                        : 'join waiting list'}
                    </button>
                  ) : null}

                  <Link
                    href={`/events/${event.id}`}
                    className="btn btn-secondary"
                  >
                    Learn more
                  </Link>
                </div>
                {event.ticketsRemaining == 0 && (
                  <div className="event-display-banner sold-out">
                    <h3>SOLD OUT</h3>
                  </div>
                )}
                {event.isFree && (
                  <div className="event-display-banner free">
                    <h3>FREE</h3>
                  </div>
                )}
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
                    <h4 key={index}>{`${getLongDate(item.date)} ${getTimeString(
                      item.startTime
                    )} - ${getTimeString(item.endTime)}`}</h4>
                  ))}
                </div>
              ) : null
            }
          >
            {bookingFormEvent ? (
              bookingFormEvent.ticketsRemaining! > 0 ? (
                <BookingForm event={bookingFormEvent} />
              ) : (
                <WaitingListForm event={bookingFormEvent} />
              )
            ) : null}
          </Overlay>
        </>
      )}
      {page == 'home' && events.length > 0 ? (
        <Link href="/events" className="btn btn-primary">
          See All Events
        </Link>
      ) : null}
    </section>
  );
};

export default EventsDisplay;
