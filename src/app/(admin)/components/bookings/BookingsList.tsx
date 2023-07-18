'use client';

import { useEffect, useState } from 'react';
import { BookingsData, EventsData } from '@/lib/interfaces';
import Overlay from '@/lib/globalComponents/Overlay';
import BookingsDetails from './BookingsDetails';
import { getFullDate } from '@/lib/functions';

interface BookingsListProps {
  selectedEvent: EventsData | null;
}

const BookingsList = ({ selectedEvent }: BookingsListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingsData | null>(
    null
  );
  const [displayedBookings, setDisplayedBookings] = useState<BookingsData[]>(
    []
  );

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent]);

  const fetchBookings = async () => {
    const bookings: any[] = [];
    setDisplayedBookings(
      bookings.filter((booking) => booking.eventID == selectedEvent)
    );
  };

  const showBookingDetails = (booking: BookingsData) => {
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
            <p>Event ID: {selectedBooking?.eventID}</p>
            <p>Booking Date: {getFullDate(selectedBooking?.bookingDate)}</p>
          </div>
        }
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <BookingsDetails booking={selectedBooking} />
      </Overlay>

      {selectedEvent ? (
        <h2 className="booking-list-header">
          Bookings for {selectedEvent.title} -{' '}
          {getFullDate(selectedEvent.dateTimes[0].date)}
        </h2>
      ) : null}
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
          {displayedBookings.map((booking) => (
            <tr onClick={() => showBookingDetails(booking)} key={booking.id}>
              <td>{booking.id}</td>
              <td>
                {booking.contact.firstName} {booking.contact.lastName}
              </td>
              <td className="hide-mobile">{booking.contact.email}</td>
              <td>{booking.bookingDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsList;
