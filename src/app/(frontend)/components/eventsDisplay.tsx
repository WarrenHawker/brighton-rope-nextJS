'use client';

import {
  getLongDate,
  getShortDate,
  getTimeString,
  trimString,
} from '@/utils/functions';
import Overlay from '@/utils/globalComponents/Overlay';
import { EventsData } from '@/utils/interfaces';
import BookingForm from './bookingForm/bookingForm';
import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchEventsClient } from '@/utils/clientFetch';

interface EventsDisplayProps {
  page: string;
}

const EventsDisplay = ({ page }: EventsDisplayProps) => {
  const eventsAmount = page == 'home' ? 3 : -1;
  const query = page == 'home' ? 'upcoming home' : 'upcoming all';
  const { data } = useQuery({
    queryKey: ['events', query],
    queryFn: () => fetchEventsClient({ amount: eventsAmount, old: 'false' }),
  });
  const [bookingFormEvent, setBookingFormEvent] = useState<EventsData | null>(
    null
  );
  const [bookingFormOpen, setBookingFormOpen] = useState<boolean>(false);

  const showBookingForm = (id: any) => {
    setBookingFormEvent(data.filter((event: EventsData) => event.id == id)[0]);
    setBookingFormOpen(true);
  };
  return (
    <section className="events-container">
      <h1>Our Upcoming Events</h1>
      {!data ? (
        <h2>I&apos;m sorry, there are no upcoming events</h2>
      ) : (
        <>
          {data.map((event: EventsData) => {
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
                  {event.prices.length ? (
                    <button
                      className="btn btn-primary"
                      onClick={(e) => showBookingForm(event.id)}
                    >
                      Book Tickets
                    </button>
                  ) : null}

                  <Link
                    href={`/events/${event.id}`}
                    className="btn btn-secondary"
                  >
                    Learn more
                  </Link>
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
                    <h4 key={index}>{`${getLongDate(item.date)} ${getTimeString(
                      item.startTime
                    )} - ${getTimeString(item.endTime)}`}</h4>
                  ))}
                </div>
              ) : null
            }
          >
            {bookingFormEvent ? <BookingForm event={bookingFormEvent} /> : null}
          </Overlay>
        </>
      )}
      {page == 'home' ? (
        <Link href="/events" className="btn btn-primary">
          See All Events
        </Link>
      ) : null}
    </section>
  );
};

export default EventsDisplay;
