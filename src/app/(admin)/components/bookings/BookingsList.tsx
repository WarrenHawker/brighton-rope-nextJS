'use client';

import { useEffect, useState } from 'react';
import { BookingsData, EventsData } from '@/lib/interfaces';
import Overlay from '@/lib/globalComponents/Overlay';
import BookingsDetails from './BookingsDetails';
import { getFullDate } from '@/lib/functions';

interface BookingsListProps {
  selectedEvent: EventsData | null;
  events: EventsData[];
}

const BookingsList = ({ selectedEvent, events }: BookingsListProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingsData | null>(
    null
  );
  const [bookings, setBookings] = useState<BookingsData[]>([]);

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent]);

  const fetchBookings = async () => {
    const res = await fetch('/api/bookings');
    const data = await res.json();
    const fetchedBookings = data.bookings.map((booking: any) => {
      return {
        id: booking.id,
        eventId: booking.eventId,
        tickets: JSON.parse(booking.tickets),
        contact: JSON.parse(booking.contact),
        amountToPay: booking.amountToPay,
        additionalInfo: booking.additionalInfo,
        adminNotes: booking.adminNotes,
        bookingDate: booking.bookingDate,
        hasPaid: booking.hasPaid,
      };
    });
    setBookings(fetchedBookings);
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
            <p>Event ID: {selectedBooking?.eventId}</p>
            <p>Booking Date: {getFullDate(selectedBooking?.bookingDate)}</p>
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
          {bookings.map((booking) => (
            <tr onClick={() => showBookingDetails(booking)} key={booking.id}>
              <td>{booking.id}</td>
              <td>
                {booking.contact.firstName} {booking.contact.lastName}
              </td>
              <td className="hide-mobile">{booking.contact.email}</td>
              <td>{getFullDate(booking.bookingDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsList;
