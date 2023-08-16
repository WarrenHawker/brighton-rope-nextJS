'use client';
import { useEffect, useRef, useState } from 'react';
import { BookingClient, TicketChoices } from '@/utils/types/bookings';
import { EventDBAdmin } from '@/utils/types/events';
import useDeleteBooking from '@/hooks/bookings/useDeleteBooking';
import useUpdateBooking from '@/hooks/bookings/useUpdateBooking';
import useMoveBooking from '@/hooks/bookings/useMoveBooking';

//TODO Test edit and delete functions
//TODO restyle component

interface BookingDetailsProps {
  booking: BookingClient | null;
  setSelectedBooking: (value: BookingClient | null) => void;
  setIsModalOpen: (value: boolean) => void;
  events: EventDBAdmin[];
}

const BookingsDetails = ({
  events,
  booking,
  setSelectedBooking,
  setIsModalOpen,
}: BookingDetailsProps) => {
  const [editing, setEditing] = useState(false);
  const [move, setMove] = useState(false);
  const moveSelect = useRef<HTMLSelectElement>(null);
  const [firstName, setFirstName] = useState(booking?.contact.firstName);
  const [lastName, setLastName] = useState(booking?.contact.lastName);
  const [email, setEmail] = useState(booking?.contact.email);
  const [additionalInfo, setAdditionalInfo] = useState(booking?.additionalInfo);
  const [adminNotes, setAdminNotes] = useState(booking?.adminNotes);
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { mutateAsync: deleteMutate, status: deleteStatus } =
    useDeleteBooking();
  const { mutateAsync: updateMutate, status: updateStatus } =
    useUpdateBooking();
  const { mutateAsync: moveMutate, status: moveStatus } = useMoveBooking();

  useEffect(() => {
    if (booking) {
      setFirstName(booking.contact.firstName);
      setLastName(booking.contact.lastName);
      setEmail(booking.contact.email);
      setAdditionalInfo(booking.additionalInfo);
      setAdminNotes(booking.adminNotes);
    }
  }, [booking]);

  const saveEdits = async () => {
    const data = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
      additionalInfo: additionalInfo,
      adminNotes: adminNotes,
    };
    try {
      await updateMutate({
        url: `/api/events/${booking?.eventId}/bookings/${booking?.id}`,
        updateData: data,
      });
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const cancelEdits = () => {
    setEditing(false);
    setFirstName(booking?.contact.firstName);
    setLastName(booking?.contact.lastName);
    setEmail(booking?.contact.email);
    setAdditionalInfo(booking?.additionalInfo);
    setAdminNotes(booking?.adminNotes);
  };

  const deleteBookingClick = async () => {
    if (
      confirm(
        'Are you sure you want to delete this booking? This process is irreversible'
      )
    ) {
      try {
        await deleteMutate(
          `/api/events/${booking?.eventId}/bookings/${booking?.id}`
        );
        setSelectedBooking(null);
        setIsModalOpen(false);
      } catch (error) {
        setError((error as Error).message);
      }
    } else return;
  };

  const moveBooking = async () => {
    if (!moveSelect.current!.value) {
      setError('could not move booking - no new class selected');
    }
    try {
      await moveMutate({
        url: `/api/move-booking/${booking!.id}`,
        moveData: {
          oldEventId: booking!.eventId,
          newEventId: parseInt(moveSelect.current!.value),
          ticketAmount: booking!.totalTickets,
        },
      });
      setSelectedBooking(null);
      setIsModalOpen(false);
    } catch (error) {
      setError((error as Error).message);
    }
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
      {deleteStatus == 'loading' && (
        <h3 className="center">Deleting Booking...</h3>
      )}
      {updateStatus == 'loading' && (
        <h3 className="center">Updating Booking...</h3>
      )}
      {moveStatus == 'loading' && <h3 className="center">Moving Booking...</h3>}

      {error && <h3 className="center error">{error}</h3>}

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

        {!move ? (
          <button className="btn" onClick={() => setMove(true)}>
            Move
          </button>
        ) : null}

        <button className="btn btn-delete" onClick={deleteBookingClick}>
          Delete
        </button>
      </div>

      {move ? (
        <div className="move-to-class">
          <div>
            <label>Move booking to which class?</label>
            <select ref={moveSelect}>
              <option value="" disabled hidden></option>
              {events
                .filter(
                  (event) =>
                    !event.isFree &&
                    event.ticketsRemaining! >= booking.totalTickets &&
                    event.id != booking.eventId
                )
                .map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
            </select>
          </div>
          <button className="btn" onClick={moveBooking}>
            Save
          </button>
          <button className="btn" onClick={() => setMove(false)}>
            Cancel
          </button>
        </div>
      ) : null}

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
                <td>{ticket.key}</td>
                <td>£{ticket.value}</td>
                <td>{ticket.quantity}</td>
              </tr>
            ))}
            <tr className="amount-total">
              <th colSpan={3}>Total To Pay: £{booking.amountToPay}</th>
            </tr>
            <tr className="has-paid">
              <th colSpan={2}>Has Paid?</th>
              <td>{booking.hasPaid ? 'yes' : 'no'}</td>
            </tr>
          </tbody>
        </table>
        <table className="sub-table">
          <caption>Contact information</caption>
          <tbody>
            <tr>
              <th>First Name</th>
              <td>
                <input
                  disabled={!editing}
                  type="text"
                  defaultValue={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>
                <input
                  disabled={!editing}
                  type="text"
                  defaultValue={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <input
                  disabled={!editing}
                  type="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
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
            defaultValue={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            disabled={!editing}
          />
        </div>

        <div className="textarea-container">
          <label htmlFor="admin-notes">Admin Notes</label>
          <textarea
            name="admin-notes"
            id="admin-notes"
            defaultValue={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            disabled={!editing}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingsDetails;
