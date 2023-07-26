'use client';

import { getFullDate, getLongDate, getTimeString } from '@/utils/functions';
import Overlay from '@/utils/globalComponents/Overlay';
import { EventDateTime, EventsData } from '@/utils/interfaces';
import { useState } from 'react';
import BookingForm from './bookingForm/bookingForm';
import Link from 'next/link';
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { fetchEventByIdClient } from '@/utils/clientFetch';
import { useQuery } from '@tanstack/react-query';
import WaitingListForm from './waitlistForm';

interface Props {
  eventId: string;
}

const SingleEventDetails = ({ eventId }: Props) => {
  const [bookingFormOpen, setBookingFormOpen] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: ['events', eventId],
    queryFn: () => fetchEventByIdClient(eventId),
  });

  if (!data) {
    return (
      <main>
        <h1>No event found</h1>
      </main>
    );
  }

  return (
    <main>
      <h1 className="page-title">{data.title}</h1>
      <section className="single-event">
        {!data.prices.length && (
          <h2 className="single-event-free">
            This event is FREE! Just turn up and have fun
          </h2>
        )}
        {data.ticketsRemaining == 0 && (
          <h2 className="single-event-free">
            We&apos;re sorry, this class is full. Click the button below to join
            the waiting list
          </h2>
        )}
        <div className="single-event-details">
          <div className="single-event-location">
            <h3>Location:</h3>
            <p>{data.location.lineOne}</p>
            <p>{data.location.lineTwo}</p>
            <p>{data.location.city}</p>
            <p>{data.location.country}</p>
            <p>{data.location.postcode}</p>
          </div>

          <div className="single-event-date-times">
            <h3>Dates and Times:</h3>
            {data.dateTimes.map((item: EventDateTime, index: number) => (
              <p key={index}>{`${getFullDate(item.date)}  ${getTimeString(
                item.startTime
              )} - ${getTimeString(item.endTime)}`}</p>
            ))}
          </div>
        </div>

        <MdPreview modelValue={data.description} />

        <div className="button-container">
          {data.prices.length ? (
            <button
              onClick={() => setBookingFormOpen(true)}
              className="btn btn-primary"
            >
              {data.ticketsRemaining > 0 ? 'Book Tickets' : 'Join Waiting List'}
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
            data ? (
              <div className="event-info">
                <h3>{data.title}</h3>
                {data.dateTimes.map((item: EventDateTime, index: number) => (
                  <h4 key={index}>{`${getLongDate(item.date)} ${
                    item.startTime
                  } - ${item.endTime}`}</h4>
                ))}
              </div>
            ) : null
          }
        >
          {data ? (
            data.ticketsRemaining > 0 ? (
              <BookingForm event={data} />
            ) : (
              <WaitingListForm event={data} />
            )
          ) : null}
        </Overlay>
      </section>
    </main>
  );
};

export default SingleEventDetails;
