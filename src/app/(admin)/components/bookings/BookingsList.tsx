'use client';

import { useState } from 'react';
import Overlay from '@/utils/globalComponents/Overlay';
import BookingsDetails from './BookingsDetails';
import { getFullDate } from '@/utils/functions';

import { BookingClient } from '@/utils/types/bookings';
import { EventClientAdmin } from '@/utils/types/events';

// TODO Add fetchBookings query

interface BookingsListProps {
  selectedEvent: EventClientAdmin | null;
  events: [];
}

const BookingsList = ({ selectedEvent, events }: BookingsListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingClient | null>(
    null
  );
  const [bookings, setBookings] = useState([]);

  const showBookingDetails = (booking: BookingClient) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  return (
    <div className="booking-list">
      <Overlay
        header={
          <div className="booking-details-header">
            <h2>Booking Details</h2>
            <p>Booking ID: {selectedBooking?.id}</p>
            <p>Event ID: {selectedBooking?.eventId}</p>
            <p>Booking Date: {getFullDate(selectedBooking?.createdOn)}</p>
          </div>
        }
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <BookingsDetails
          booking={selectedBooking}
          setSelectedBooking={setSelectedBooking}
          setIsModalOpen={setIsModalOpen}
          events={events}
        />
      </Overlay>

      {selectedEvent ? (
        <h2 className="booking-list-header">
          Bookings for {selectedEvent.title} -{' '}
          {getFullDate(selectedEvent.dateTimes[0].date)}
        </h2>
      ) : null}
      {!selectedEvent?.isFree ? (
        <table className="main-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className="hide-mobile">Email</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking: BookingClient) => (
              <tr onClick={() => showBookingDetails(booking)} key={booking.id}>
                <td>{booking.id}</td>
                <td>
                  {booking.contact.firstName} {booking.contact.lastName}
                </td>
                <td className="hide-mobile">{booking.contact.email}</td>
                <td>{getFullDate(booking.createdOn)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className="center">There are no bookings for free events</h3>
      )}
    </div>
  );
};

export default BookingsList;
