'use client';

import { BookingPageProps } from '@/utils/interfaces';
import { MouseEvent, useEffect, useRef, useState } from 'react';

interface PageOneProps extends BookingPageProps {
  updateUserTickets: (
    ticketName: string,
    property: string,
    value: number
  ) => void;
}

const BookingPageOne = ({
  nextPage,
  updateUserTickets,
  userChoices,
  event,
}: PageOneProps) => {
  const [error, setError] = useState('');
  const inputs = useRef<(HTMLInputElement | HTMLSelectElement)[]>([]);

  useEffect(() => {
    if (inputs.current) {
      inputs.current.forEach((input: HTMLInputElement | HTMLSelectElement) => {
        if (input.type == 'select-one') {
          // input.value = '0';
        }
        if (input.type == 'range') {
          input.setAttribute('defaultValue', input.value);
          input.addEventListener('input', function rangeChange(this: any) {
            this.setAttribute('defaultValue', this.value);
            updateUserTickets(this.id, 'value', parseFloat(this.value));
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  const addInput = (input: HTMLInputElement | HTMLSelectElement | null) => {
    if (input == null) {
      return;
    } else {
      if (inputs.current.includes(input)) {
        return;
      } else {
        inputs.current.push(input);
      }
    }
  };

  const nextPageClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const filter = userChoices.tickets.filter((item) => item.quantity > 0);
    if (filter.length == 0) {
      setError('Please select at least 1 ticket from the categories above');
    } else nextPage();
  };

  const ticketSelectDisplay = userChoices.tickets.map((price, index) => {
    const eventDetails = event!.prices
      .filter((item) => item.key == price.name)
      .map((item) => {
        return {
          fixedPrice: item.fixedPrice,
          minPrice: item.value.minPrice,
          maxPrice: item.value.maxPrice,
        };
      })[0];
    return (
      <div className="select-input-container" key={index}>
        <label htmlFor={price.name}>
          {price.name}
          <span className="prices-span">
            {eventDetails.fixedPrice ? (
              `£${eventDetails.minPrice}`
            ) : (
              <input
                type="range"
                ref={(el) => addInput(el)}
                id={price.name}
                min={eventDetails.minPrice}
                max={eventDetails.maxPrice!}
                defaultValue={price.value}
              />
            )}
          </span>
        </label>
        <input
          type="radio"
          ref={(el) => addInput(el)}
          name="ticket"
          value={price.name}
          checked={price.quantity == 1}
          onChange={() => updateUserTickets(price.name, 'quantity', 1)}
        />
      </div>
    );
  });

  const ticketMultipleDisplay = userChoices.tickets.map((price, index) => {
    const eventDetails = event!.prices
      .filter((item) => item.key == price.name)
      .map((item) => {
        return {
          fixedPrice: item.fixedPrice,
          minPrice: item.value.minPrice,
          maxPrice: item.value.maxPrice,
        };
      })[0];
    return (
      <div className="select-input-container" key={index}>
        <label htmlFor={price.name}>
          {price.name}{' '}
          <span className="prices-span">
            {eventDetails.fixedPrice ? (
              `£${eventDetails.minPrice} per ticket`
            ) : (
              <input
                id={price.name}
                type="range"
                ref={(el) => addInput(el)}
                min={eventDetails.minPrice}
                max={eventDetails.maxPrice!}
                defaultValue={price.value}
              />
            )}
          </span>
        </label>
        <select
          ref={(el) => addInput(el)}
          defaultValue={price.quantity}
          name={price.name}
          onChange={(e) =>
            updateUserTickets(price.name, 'quantity', parseInt(e.target.value))
          }
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">8</option>
          <option value="10">10</option>
        </select>
      </div>
    );
  });

  return (
    <div className="booking-form-page">
      <fieldset className="tickets">
        {event?.allowMultipleTickets ? (
          <h4>How many tickets would you like to book?</h4>
        ) : (
          <h4>Please select your ticket</h4>
        )}
        {event?.allowMultipleTickets
          ? ticketMultipleDisplay
          : ticketSelectDisplay}
      </fieldset>
      <h3>Total amount to pay: £{userChoices.amountToPay}</h3>
      <p className="agree-to-ToS">
        By clicking <strong>NEXT</strong> you agree to our{' '}
        <a href="#" target="_blank">
          Terms of Service
        </a>
        <span> (opens in a new window)</span>
      </p>
      {error ? <p className="error">{error}</p> : null}
      <button onClick={(e) => nextPageClick(e)} className="btn btn-primary">
        Next
      </button>
    </div>
  );
};

export default BookingPageOne;
