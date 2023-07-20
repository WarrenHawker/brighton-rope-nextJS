'use client';

import { useState } from 'react';
import { getFullDate } from '../../../../lib/functions';
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { EventsData } from '@/lib/interfaces';
import EditEvent from './EditEvent';

interface EventDetailsProps {
  selectedEvent: EventsData | null;
}

const EventDetails = ({ selectedEvent }: EventDetailsProps) => {
  const [editing, setEditing] = useState(false);

  const deleteEvent = async () => {
    if (
      confirm(
        'Are you sure you want to delete this event? This process is irreversible'
      )
    ) {
      const res = await fetch(`/api/events/${selectedEvent!.id}`, {
        method: 'DELETE',
      });
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
          {selectedEvent.title} - {getFullDate(selectedEvent.dateTimes[0].date)}
        </h2>
      </div>
      {editing ? (
        <EditEvent event={selectedEvent} setEditing={setEditing} />
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
              {selectedEvent.dateTimes.map((item, index) => (
                <tr key={index}>
                  <td>{getFullDate(item.date)}</td>
                  <td>{item.startTime}</td>
                  <td>{item.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
              {selectedEvent.prices.map((item, index) => (
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

          <table className="sub-table event-location-table">
            <caption>Location</caption>
            <tbody>
              <tr>
                <th>Address Line 1</th>
                <td>{selectedEvent.location.lineOne}</td>
              </tr>
              <tr>
                <th>Address Line 2</th>
                <td>{selectedEvent.location.lineTwo}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{selectedEvent.location.city}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{selectedEvent.location.country}</td>
              </tr>
              <tr>
                <th>Postcode</th>
                <td>{selectedEvent.location.postcode}</td>
              </tr>
            </tbody>
          </table>
          <table className="sub-table event-description">
            <caption>Description</caption>
            <tbody>
              <tr>
                <td>
                  <MdPreview modelValue={selectedEvent.description} />
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
