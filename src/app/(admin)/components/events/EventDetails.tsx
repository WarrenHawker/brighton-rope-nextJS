'use client';

import { useState } from 'react';
import { getFullDate } from '../../../../utils/functions';

import MDEditor from '@uiw/react-md-editor';
import useDeleteEvent from '@/hooks/events/useDeleteEvent';
import AddEditEvent from './AddEditEvent';
import { EventClientAdmin, EventDateTime } from '@/utils/types/events';
import { Prices, Address } from '@/utils/types/globals';

interface EventDetailsProps {
  selectedEvent: EventClientAdmin | null;
}

const EventDetails = ({ selectedEvent }: EventDetailsProps) => {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: deleteMutate, status: deleteStatus } = useDeleteEvent();

  const deleteEvent = async () => {
    if (
      confirm(
        'Are you sure you want to delete this event? This process is irreversible'
      )
    ) {
      try {
        await deleteMutate(`/api/events/${selectedEvent!.id}`);
      } catch (error) {
        setError((error as Error).message);
      }
    } else return;
  };

  if (!selectedEvent) {
    return (
      <div className="event-details">
        <h2>No Event Selected</h2>
      </div>
    );
  }

  return (
    <div className="event-details">
      <div className="event-details-header">
        <p>Event ID: {selectedEvent.id}</p>
        <h2>
          {selectedEvent.title} - {getFullDate(selectedEvent.startDate)}
        </h2>
        <h3 className="center">
          {selectedEvent.isFree ? 'FREE EVENT' : 'PAID EVENT'}
        </h3>
      </div>
      {deleteStatus == 'loading' && (
        <h3 className="center">Deleting Event...</h3>
      )}
      {error && <h3 className="center error">{error}</h3>}
      {editing ? (
        <AddEditEvent event={selectedEvent} setActive={setEditing} />
      ) : (
        <>
          <div className="button-container">
            <button onClick={() => setEditing(true)} className="btn">
              Edit
            </button>
            <button className="btn btn-delete" onClick={deleteEvent}>
              Delete
            </button>
          </div>
          <table className="sub-table event-dates-table">
            <caption>Dates</caption>
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {(selectedEvent.dateTimes as EventDateTime[]).map(
                (item, index) => (
                  <tr key={index}>
                    <td>{getFullDate(item.date)}</td>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {!selectedEvent.isFree && (
            <table className="sub-table event-prices-table">
              <caption>Prices</caption>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Fixed Price?</th>
                  <th>Amount (min-max)</th>
                </tr>
              </thead>
              <tbody>
                {(selectedEvent.prices as Prices[]).map((item, index) => (
                  <tr key={index}>
                    <td>{item.key}</td>
                    <td>{item.fixedPrice ? 'yes' : 'no'}</td>
                    <td>
                      {item.fixedPrice
                        ? `£${item.value.minPrice}`
                        : `£${item.value.minPrice} - £${item.value.maxPrice}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!selectedEvent.isFree && (
            <table className="sub-table event-tickets-table">
              <caption>Tickets</caption>
              <tbody>
                <tr>
                  <th>Max # of tickets</th>
                  <td>{selectedEvent.maxTickets}</td>
                </tr>
                <tr>
                  <th>Tickets Sold</th>
                  <td>{selectedEvent.ticketsSold}</td>
                </tr>
                <tr>
                  <th>Tickets Remaining</th>
                  <td>{selectedEvent.ticketsRemaining}</td>
                </tr>
                <tr>
                  <th>Allow Multiple Tickets?</th>
                  <td>{selectedEvent.allowMultipleTickets ? 'yes' : 'no'}</td>
                </tr>
              </tbody>
            </table>
          )}

          <table className="sub-table event-location-table">
            <caption>Location</caption>
            <tbody>
              <tr>
                <th>Address Line 1</th>
                <td>{(selectedEvent.location as Address).lineOne}</td>
              </tr>
              <tr>
                <th>Address Line 2</th>
                <td>{(selectedEvent.location as Address).lineTwo}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{(selectedEvent.location as Address).city}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{(selectedEvent.location as Address).country}</td>
              </tr>
              <tr>
                <th>Postcode</th>
                <td>{(selectedEvent.location as Address).postcode}</td>
              </tr>
            </tbody>
          </table>
          <table className="sub-table event-description">
            <caption>Description</caption>
            <tbody>
              <tr>
                <td>
                  {editing ? (
                    <MDEditor value={selectedEvent.description} />
                  ) : (
                    <MDEditor.Markdown source={selectedEvent.description} />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default EventDetails;
