import { BookingsData, TicketChoices } from '@/lib/interfaces';
import { useState } from 'react';

interface BookingDetailsProps {
  booking: BookingsData | null;
}

const BookingsDetails = ({ booking }: BookingDetailsProps) => {
  const [editing, setEditing] = useState(false);

  const saveEdits = () => {
    setEditing(false);
  };

  const cancelEdits = () => {
    setEditing(false);
  };

  if (!booking) {
    return (
      <>
        <h3>no booking selected</h3>
      </>
    );
  }

  return (
    <div className="booking-details">
      <div className="button-container">
        {editing ? (
          <>
            <button onClick={saveEdits} className="btn">
              Save
            </button>
            <button onClick={cancelEdits} className="btn">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(true)} className="btn">
            Edit
          </button>
        )}
        <button className="btn">Move</button>
        <button className="btn btn-delete">Delete</button>
      </div>

      <div className="tables-container">
        <table className="sub-table">
          <caption>Tickets</caption>
          <thead>
            <tr>
              <th>Type</th>
              <th>Value</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {booking.tickets.map((ticket: TicketChoices, index: number) => (
              <tr key={index}>
                <td>{ticket.name}</td>
                <td>{ticket.value}</td>
                <td>{ticket.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="sub-table">
          <caption>Contact information</caption>
          <tbody>
            <tr>
              <th>First Name</th>
              <td>{booking.contact.firstName}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{booking.contact.lastName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{booking.contact.email}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{booking.contact.phone}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="booking-details-info-container">
        <div className="textarea-container">
          <label htmlFor="additional-info">Additional Information</label>
          <textarea
            name="additional-info"
            id="additional-info"
            defaultValue={booking.additionalInfo}
            disabled={!editing}
          />
        </div>

        <div className="textarea-container">
          <label htmlFor="admin-notes">Admin Notes</label>
          <textarea
            name="admin-notes"
            id="admin-notes"
            defaultValue={booking.adminNotes}
            disabled={!editing}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingsDetails;
