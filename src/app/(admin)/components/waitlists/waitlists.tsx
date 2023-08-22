'use client';

import Overlay from '@/utils/globalComponents/Overlay';
import { getFullDate } from '@/utils/functions';
import { useState } from 'react';
import WaitlistDetails from './WaitlistDetails';
import { EventClientAdmin } from '@/utils/types/events';
import useFetchWaitlists from '@/hooks/waitlists/useFetchWaitlists';
import { WaitlistClient } from '@/utils/types/waitlists';

interface WaitlistProps {
  selectedEvent: EventClientAdmin;
}

const Waitlist = ({ selectedEvent }: WaitlistProps) => {
  const [eventInfo, setEventInfo] = useState({
    title: selectedEvent.title,
    date: selectedEvent.startDate,
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedWaitlist, setSelectedWaitlist] =
    useState<WaitlistClient | null>(null);

  const {
    data: waitlists,
    status,
    error,
  } = useFetchWaitlists(selectedEvent.id);

  const showWaitlistDetails = (waitlist: WaitlistClient) => {
    setSelectedWaitlist(waitlist);
    setIsModalOpen(true);
  };

  if (status == 'loading') {
    return <h3 className="center">Loading...</h3>;
  }

  if (status == 'error') {
    return <h3 className="center error">{(error as Error).message}</h3>;
  }

  return (
    <div className="waiting-list">
      <Overlay
        header={
          <div className="booking-details-header">
            <h2>Waitlist Inquiry Details</h2>
            <p>Waitlist ID: {selectedWaitlist?.id}</p>
            <p>Event ID: {selectedWaitlist?.eventId}</p>
            <p>Waitlist Date: {getFullDate(selectedWaitlist?.createdOn)}</p>
          </div>
        }
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <WaitlistDetails
          waitlist={selectedWaitlist}
          setSelectedWaitlist={setSelectedWaitlist}
          setIsModalOpen={setIsModalOpen}
        />
      </Overlay>

      {eventInfo ? (
        <h2 className="booking-list-header">
          Waitlist for {eventInfo.title} - {getFullDate(eventInfo.date)}
        </h2>
      ) : null}
      {!selectedEvent?.isFree ? (
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
            {waitlists.map((waitlist: WaitlistClient) => (
              <tr
                key={waitlist.id}
                onClick={() => showWaitlistDetails(waitlist)}
              >
                <td>{waitlist.id}</td>
                <td>
                  {waitlist.contact.firstName} {waitlist.contact.lastName}
                </td>
                <td className="hide-mobile">{waitlist.contact.email}</td>
                <td>{getFullDate(waitlist.createdOn)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className="center">There is no waitlist for free events</h3>
      )}
    </div>
  );
};

export default Waitlist;
