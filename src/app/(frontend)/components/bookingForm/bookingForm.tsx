import { isContact } from '@/lib/functions';
import { EventsData, UserChoices, TicketChoices } from '@/lib/interfaces';
import { useState } from 'react';
import BookingPageOne from './bookingFormPages/bookingPageOne';
import BookingPageThree from './bookingFormPages/bookingPageThree';
import BookingPageTwo from './bookingFormPages/bookingPageTwo';

interface BookingFormProps {
  eventId: string;
}

const BookingForm = ({ eventId }: BookingFormProps) => {
  const [activePage, setActivePage] = useState(1);
  const [event, setEvent] = useState<EventsData | undefined>();
  const [userChoices, setUserChoices] = useState<UserChoices>({
    id: '1',
    tickets: [],
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    amountToPay: 0,
    additionalInfo: '',
  });
  console.log(userChoices);

  // useEffect(() => {
  //   const newEventsData = convertToArray(events);
  //   const selectedEvent = newEventsData.filter(
  //     (item: EventsData) => item.id == eventId.toString()
  //   )[0];
  //   setEvent(selectedEvent);
  //   setUserChoices((prevChoices) => {
  //     return {
  //       ...prevChoices,
  //       tickets: selectedEvent.prices.map((item) => {
  //         return { name: item.key, value: item.value.minPrice, quantity: 0 };
  //       }),
  //     };
  //   });
  // }, [eventId]);

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
      return {
        ...prevChoices,
        tickets: updatedTickets,
        amountToPay: updateAmountToPay(updatedTickets),
      };
    });
  };

  const prevPage = () => {
    setActivePage((prev) => prev - 1);
  };

  const nextPage = () => {
    setActivePage((prev) => prev + 1);
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
