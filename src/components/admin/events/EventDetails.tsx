'use client';

import { useEffect, useState } from 'react';
import { getFullDate } from '../../../lib/functions';
import { MdEditor, MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { useEvents } from '@/context/EventsContext';
import { EventsData } from '@/lib/interfaces';

const EventDetails = () => {
  const { events, selectedEvent } = useEvents();
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState<string>('');
  const [event, setEvent] = useState<EventsData | null>(null);

  useEffect(() => {
    if (selectedEvent) {
      setEvent(events.filter((event) => event.id == selectedEvent)[0]);
      setDescription(
        events.filter((event) => event.id == selectedEvent)[0].description
      );
    }
  }, [selectedEvent, events]);

  const saveEdits = () => {
    setEditing(false);
  };

  const cancelEdits = () => {
    setEditing(false);
  };

  if (!event) {
    return (
      <div className="event-details">
        <h2>No Event Selected</h2>
      </div>
    );
  }

  return (
    <div className="event-details">
      <div className="event-details-header">
        <p>Event ID: {event.id}</p>
        <h2>
          {event.title} - {getFullDate(event.dateTimes[0].date)}
        </h2>

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
          <button className="btn btn-delete">Delete</button>
        </div>
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
          {event.dateTimes.map((item, index) => (
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
          {event.prices.map((item, index) => (
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
            <td>{event.maxTickets}</td>
          </tr>
          <tr>
            <th>Tickets Sold</th>
            <td>{event.ticketsSold}</td>
          </tr>
          <tr>
            <th>Tickets Remaining</th>
            <td>{event.ticketsRemaining}</td>
          </tr>
          <tr>
            <th>Allow Multiple Tickets?</th>
            <td>{event.allowMultipleTickets ? 'yes' : 'no'}</td>
          </tr>
        </tbody>
      </table>

      <table className="sub-table event-location-table">
        <caption>Location</caption>
        <tbody>
          <tr>
            <th>Address Line 1</th>
            <td>{event.location.lineOne}</td>
          </tr>
          <tr>
            <th>Address Line 2</th>
            <td>{event.location.lineTwo}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{event.location.city}</td>
          </tr>
          <tr>
            <th>Country</th>
            <td>{event.location.country}</td>
          </tr>
          <tr>
            <th>Postcode</th>
            <td>{event.location.postcode}</td>
          </tr>
        </tbody>
      </table>
      <table className="sub-table event-description">
        <caption>Description</caption>
        <tbody>
          <tr>
            <td>
              {editing ? (
                <MdEditor
                  modelValue={description}
                  language="en-US"
                  onChange={setDescription}
                />
              ) : (
                <MdPreview modelValue={description} />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventDetails;
