'use client';

import { isContact } from '@/utils/functions';
import { useState } from 'react';
import BookingPageOne from './bookingFormPages/BookingPageOne';
import BookingPageThree from './bookingFormPages/BookingPageThree';
import BookingPageTwo from './bookingFormPages/BookingPageTwo';
import useCreateBooking from '@/hooks/bookings/useCreateBooking';
import { EventClient } from '@/utils/types/events';
import { TicketChoices } from '@/utils/types/bookings';

interface BookingFormProps {
  event: EventClient;
}

const BookingForm = ({ event }: BookingFormProps) => {
  const [activePage, setActivePage] = useState(1);
  const [userChoices, setUserChoices] = useState({
    tickets: event.prices!.map((item) => ({
      key: item.key,
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

  const { mutateAsync: createMutate, status } = useCreateBooking();

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
      const updatedTickets = prevChoices.tickets.map((item) => {
        if (property == 'value') {
          if (item.key == ticketName) {
            return { ...item, value: value };
          } else return { ...item };
        } else {
          if (event?.allowMultipleTickets) {
            if (item.key == ticketName) {
              return { ...item, quantity: value };
            } else return { ...item };
          } else {
            if (item.key == ticketName) {
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
    const bookingData = {
      tickets: userChoices.tickets,
      contact: userChoices.contact,
      amountToPay: userChoices.amountToPay,
      additionalInfo: userChoices.additionalInfo,
      totalTickets: userChoices.totalTickets,
    };

    await createMutate({
      url: `/api/events/${event.id}/bookings`,
      bookingData,
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
