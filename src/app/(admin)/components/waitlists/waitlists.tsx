'use client';

import Overlay from '@/utils/globalComponents/Overlay';
import { getFullDate } from '@/utils/functions';
import { BookingsData } from '@/utils/interfaces';
import { useState } from 'react';
import WaitlistDetails from './waitlistDetails';

const Waitlist = () => {
  const [eventInfo, setEventInfo] = useState({ title: '', date: '' });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedInquiry, setSelectedInquiry] = useState<BookingsData | null>(
    null
  );
  const [displayedBookings, setDisplayedBookings] = useState<BookingsData[]>(
    []
  );
  return (
    <div className="waiting-list">
      <Overlay
        header={
          <div className="booking-details-header">
            <h2>Inquiry Details</h2>
            <p>Inquiry ID: {selectedInquiry?.id}</p>
            <p>Event ID: {selectedInquiry?.eventId}</p>
            <p>Inquiry Date: {getFullDate(selectedInquiry?.bookingDate)}</p>
          </div>
        }
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <WaitlistDetails />
      </Overlay>

      {eventInfo ? (
        <h2 className="booking-list-header">
          Bookings for {eventInfo.title} - {eventInfo.date}
        </h2>
      ) : null}
      <table className="main-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="hide-mobile">Email</th>
            <th>Inquiry Date</th>
          </tr>
        </thead>
        <tbody>
          {displayedBookings.map((booking) => (
            <tr key={booking.id}>
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

export default Waitlist;
