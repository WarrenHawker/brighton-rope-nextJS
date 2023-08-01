'use client';

import { isContact } from '@/utils/functions';
import { EventsData, UserChoices, TicketChoices } from '@/utils/interfaces';
import { useState } from 'react';
import BookingPageOne from './bookingFormPages/BookingPageOne';
import BookingPageThree from './bookingFormPages/BookingPageThree';
import BookingPageTwo from './bookingFormPages/BookingPageTwo';

interface BookingFormProps {
  event: EventsData;
}

const BookingForm = ({ event }: BookingFormProps) => {
  const [activePage, setActivePage] = useState(1);
  const [userChoices, setUserChoices] = useState<UserChoices>({
    tickets: event.prices.map((item) => ({
      name: item.key,
      value: item.value.maxPrice ? item.value.maxPrice : item.value.minPrice,
      quantity: 0,
    })),
    totalTickets: 0,
    contact: {
      firstName: '',
      lastName: '',
      email: '',
    },
    amountToPay: 0,
    additionalInfo: '',
  });

  const updateAmountToPay = (tickets: TicketChoices[]): number => {
    let newAmount = 0;
    tickets.forEach((ticket) => {
      newAmount += ticket.value * ticket.quantity;
    });
    return newAmount;
  };

  const updateUserdetails = (option: string, value: string | number) => {
    setUserChoices((prevChoices) => {
      if (isContact(option)) {
        return {
          ...prevChoices,
          contact: { ...prevChoices.contact, [option]: value },
        };
      } else return { ...prevChoices, [option]: value };
    });
  };

  const updateUserTickets = (
    ticketName: string,
    property: string,
    value: number
  ) => {
    setUserChoices((prevChoices) => {
      const updatedTickets = prevChoices.tickets.map((item: TicketChoices) => {
        if (property == 'value') {
          if (item.name == ticketName) {
            return { ...item, value: value };
          } else return { ...item };
        } else {
          if (event?.allowMultipleTickets) {
            if (item.name == ticketName) {
              return { ...item, quantity: value };
            } else return { ...item };
          } else {
            if (item.name == ticketName) {
              return { ...item, quantity: 1 };
            } else return { ...item, quantity: 0 };
          }
        }
      });
      const totalTickets = updatedTickets
        .map((item) => item.quantity)
        .reduce((acc, value) => acc + value, 0);
      return {
        ...prevChoices,
        tickets: updatedTickets,
        amountToPay: updateAmountToPay(updatedTickets),
        totalTickets,
      };
    });
  };

  const prevPage = () => {
    setActivePage((prev) => prev - 1);
  };

  const nextPage = () => {
    setActivePage((prev) => prev + 1);
  };

  const submitForm = async () => {
    const booking = {
      eventId: event.id,
      tickets: JSON.stringify(userChoices.tickets),
      contact: JSON.stringify(userChoices.contact),
      amountToPay: userChoices.amountToPay,
      additionalInfo: userChoices.additionalInfo,
      hasPaid: false,
      bookingDate: new Date(),
      adminNotes: '',
      totalTickets: userChoices.totalTickets,
    };

    const res = await fetch(`/api/events/${event.id}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });
  };

  return (
    <div className="booking-form">
      <form id="booking-form">
        {activePage == 1 ? (
          <BookingPageOne
            prevPage={prevPage}
            nextPage={nextPage}
            updateUserTickets={updateUserTickets}
            userChoices={userChoices}
            event={event}
          />
        ) : activePage == 2 ? (
          <BookingPageTwo
            nextPage={nextPage}
            prevPage={prevPage}
            updateUserChoices={updateUserdetails}
            userChoices={userChoices}
            event={event}
          />
        ) : activePage == 3 ? (
          <BookingPageThree
            nextPage={nextPage}
            prevPage={prevPage}
            userChoices={userChoices}
            event={event}
            submitForm={submitForm}
          />
        ) : null}
      </form>
      <div className="step-container">
        <span
          className={
            activePage == 1
              ? 'step active'
              : activePage == 2 || activePage == 3
              ? 'step finish'
              : 'step'
          }
        ></span>
        <span
          className={
            activePage == 1
              ? 'step'
              : activePage == 2
              ? 'step active'
              : 'step finish'
          }
        ></span>
        <span className={activePage == 3 ? 'step active' : 'step'}></span>
      </div>
    </div>
  );
};

export default BookingForm;
