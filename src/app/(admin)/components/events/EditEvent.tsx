'use client';

import CountrySelector from '@/lib/globalComponents/CountrySelector';
import { Address, EventDateTime, EventsData, Prices } from '@/lib/interfaces';
import { MdEditor } from 'md-editor-rt';
import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';

interface EditEventProps {
  event: EventsData;
  setEditing: (value: boolean) => void;
}

const EditEvent = ({ event, setEditing }: EditEventProps) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState<Address>({
    lineOne: event.location.lineOne,
    lineTwo: event.location.lineTwo,
    city: event.location.city,
    country: event.location.country,
    postcode: event.location.postcode,
  });
  const [capacity, setCapacity] = useState(event.maxTickets);
  const [allowMultipleTickets, setAllowMultipleTickets] = useState(
    event.allowMultipleTickets
  );
  const [datesTimes, setDatesTimes] = useState<EventDateTime[]>(
    event.dateTimes
  );
  const [prices, setPrices] = useState<Prices[]>(event.prices);

  const addDateTime = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDatesTimes((prev) => [
      ...prev,
      { date: '', startTime: '', endTime: '', error: null },
    ]);
  };

  const removeDateTime = (selectedIndex: number) => {
    setDatesTimes((prevDateTimes) => {
      prevDateTimes.splice(selectedIndex, 1);
      return [...prevDateTimes];
    });
  };

  const validateTimes = (startTime: string, endTime: string): boolean => {
    const startTimeHour = parseInt(startTime.slice(0, 2));
    const endTimeHour = parseInt(endTime.slice(0, 2));
    if (endTimeHour == startTimeHour) {
      const startTimeMinutes = parseInt(startTime.slice(3));
      const endTimeMinutes = parseInt(endTime.slice(3));
      if (
        endTimeMinutes < startTimeMinutes ||
        endTimeMinutes == startTimeMinutes
      ) {
        return false;
      }
    }
    if (endTimeHour < startTimeHour) {
      return false;
    }
    return true;
  };

  const changeDateTime = (
    e: ChangeEvent<HTMLInputElement>,
    selectedIndex: number,
    option: string
  ) => {
    setDatesTimes((prevDatesTimes: EventDateTime[]) => {
      return prevDatesTimes.map((item, index) => {
        if (index == selectedIndex) {
          switch (option) {
            case 'date':
              return { ...item, date: e.target.value };
            case 'start':
              if (validateTimes(e.target.value, item.endTime)) {
                return { ...item, startTime: e.target.value, error: null };
              } else {
                return {
                  ...item,
                  startTime: e.target.value,
                  error: 'End time must be after start time',
                };
              }

            case 'end':
              if (validateTimes(item.startTime, e.target.value)) {
                return { ...item, endTime: e.target.value, error: null };
              } else {
                return {
                  ...item,
                  endTime: e.target.value,
                  error: 'End time must be after start time',
                };
              }
            default:
              return item;
          }
        } else return item;
      });
    });
  };

  const datesTimesDisplay = datesTimes.map((item, index) => {
    return (
      <div key={index} className="date-time-container">
        <div className="date-time-container-header">
          <h3>{`Day ${index + 1}`}</h3>
          {datesTimes.length > 1 ? (
            <i
              className="fa-solid fa-circle-xmark"
              onClick={() => removeDateTime(index)}
            ></i>
          ) : null}
        </div>

        <label htmlFor="singleDate">Date</label>
        <input
          type="date"
          name="singleDate"
          value={item.date}
          onChange={(e) => changeDateTime(e, index, 'date')}
        />

        <div className="time-input-container">
          <div>
            <label htmlFor="singleStartTime">Start Time</label>
            <input
              type="time"
              name="singleStartTime"
              value={item.startTime}
              onChange={(e) => changeDateTime(e, index, 'start')}
            />
          </div>
          <div>
            <label htmlFor="singleEndTime">End Time</label>
            <input
              type="time"
              value={item.endTime}
              name="singleEndTime"
              onChange={(e) => changeDateTime(e, index, 'end')}
            />
          </div>
        </div>

        {item.error ? <p>{item.error}</p> : null}
      </div>
    );
  });

  const addPrice = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPrices((prev) => {
      return [
        ...prev,
        { key: '', fixedPrice: true, value: { minPrice: 0, maxPrice: null } },
      ];
    });
  };

  const removePrice = (selectedIndex: number) => {
    setPrices((prevPrices) => {
      prevPrices.splice(selectedIndex, 1);
      return [...prevPrices];
    });
  };

  const changePrice = (
    e: ChangeEvent<HTMLInputElement>,
    selectedIndex: number,
    option: string
  ) => {
    setPrices((prevPrices) => {
      return prevPrices.map((item, index) => {
        if (index == selectedIndex) {
          switch (option) {
            case 'key':
              return { ...item, key: e.target.value };
            case 'value-min':
              return {
                ...item,
                value: {
                  minPrice: parseFloat(e.target.value),
                  maxPrice: item.value.maxPrice,
                },
              };
            case 'value-max':
              return {
                ...item,
                value: {
                  minPrice: item.value.minPrice,
                  maxPrice: parseFloat(e.target.value),
                },
              };
            case 'fixed':
              return { ...item, fixedPrice: !item.fixedPrice };
            default:
              return item;
          }
        } else return item;
      });
    });
  };

  const pricesDisplay = prices.map((item, index) => {
    return (
      <div key={index} className="price-container">
        <div className="price-container-header">
          <h3>{`Price Bracket ${index + 1}`}</h3>
          <i
            className="fa-solid fa-circle-xmark"
            onClick={() => removePrice(index)}
          ></i>
        </div>

        <label>Name</label>
        <input
          value={item.key}
          type="text"
          onChange={(e) => changePrice(e, index, 'key')}
        />

        <div className="checkbox-container">
          <label htmlFor="fixed">Fixed Price?</label>
          <input
            type="checkbox"
            id={`fixed-${index}`}
            checked={item.fixedPrice ? true : false}
            onChange={(e) => changePrice(e, index, 'fixed')}
          />
        </div>

        {item.fixedPrice ? (
          <>
            <label>
              Amount <span>(£)</span>
            </label>
            <input
              defaultValue={item.value.minPrice.toString()}
              type="number"
              onChange={(e) => changePrice(e, index, 'value-fixed')}
            />
          </>
        ) : (
          <div className="amount-input-container">
            <div className="amount-input">
              <label>
                Minimum amount <span>(£)</span>
              </label>
              <input
                defaultValue={item.value.minPrice.toString()}
                type="number"
                onChange={(e) => changePrice(e, index, 'value-min')}
                min="0"
              />
            </div>
            <div className="amount-input">
              <label>
                Maximum amount <span>(£)</span>
              </label>
              <input
                value={
                  item.value.maxPrice ? item.value.maxPrice.toString() : ''
                }
                type="number"
                onChange={(e) => changePrice(e, index, 'value-max')}
                min="0"
              />
            </div>
          </div>
        )}
      </div>
    );
  });

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedevent = {
      id: event.id,
      title: title,
      description: description,
      startDate: new Date(datesTimes[0].date),
      dateTimes: JSON.stringify(datesTimes),
      location: JSON.stringify(location),
      maxTickets: capacity,
      ticketsSold: 0,
      ticketsRemaining: capacity,
      prices: JSON.stringify(prices),
      allowMultipleTickets: allowMultipleTickets,
    };
    const res = await fetch(`http://localhost:3000/api/events/${event.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedevent),
    });

    const data = await res.json();
  };

  const changeLocation = (e: any) => {
    const key = e.target.name;
    const value = e.target.value;
    setLocation((prevLocation) => {
      return {
        ...prevLocation,
        [key]: value,
      };
    });
  };

  const saveEdits = () => {
    setEditing(false);
  };

  const cancelEdits = () => {
    setEditing(false);
  };

  return (
    <>
      <div className="button-container">
        <button onClick={saveEdits} className="btn">
          Save
        </button>
        <button onClick={cancelEdits} className="btn">
          Cancel
        </button>
        <button className="btn btn-delete">Delete</button>
      </div>
      <form onSubmit={(e) => submitForm(e)} className="add-event-form">
        <input
          className="title-input"
          type="text"
          name="title"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add title"
        />

        <div className="description-container">
          <label className="description-label">Description</label>
          <MdEditor
            modelValue={description}
            language="en-US"
            onChange={setDescription}
          />
        </div>
        <div className="form-column">
          <fieldset className="location">
            <legend>Location</legend>
            <label htmlFor="lineOne">Street Address</label>
            <input
              type="text"
              name="lineOne"
              defaultValue={location.lineOne}
              onChange={(e) => changeLocation(e)}
            />

            <label htmlFor="lineTwo">
              Apt, suite, etc <span>(optional)</span>
            </label>
            <input
              type="text"
              name="lineTwo"
              defaultValue={location.lineTwo}
              onChange={(e) => changeLocation(e)}
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              defaultValue={location.city}
              onChange={(e) => changeLocation(e)}
            />

            <label htmlFor="country">Country</label>
            <CountrySelector
              value={location.country}
              changeHandler={(e: any) => changeLocation(e)}
            />

            <label htmlFor="postcode">ZIP/postcode </label>
            <input
              type="text"
              name="postcode"
              defaultValue={location.postcode}
              onChange={(e) => changeLocation(e)}
            />
          </fieldset>

          <fieldset>
            <legend>Price brackets</legend>
            {pricesDisplay}
            <button type="button" onClick={(e) => addPrice(e)} className="btn">
              Add new price bracket
            </button>
          </fieldset>
        </div>

        <div className="form-column">
          <fieldset className="event-details-fields">
            <legend>Event Details</legend>
            <label htmlFor="capacity">Number of tickets available</label>
            <input
              type="number"
              name="capacity"
              defaultValue={capacity}
              onChange={(e) => setCapacity(parseInt(e.target.value))}
              min="0"
            />
            <div className="checkbox-container">
              <label htmlFor="allowMultipleTickets">
                Allow customer to buy multiple tickets?
              </label>
              <input
                type="checkbox"
                checked={allowMultipleTickets}
                onChange={(e) => setAllowMultipleTickets(e.target.checked)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Dates and Times</legend>
            {datesTimesDisplay}
            <button type="button" onClick={addDateTime} className="btn">
              Add new day to event
            </button>
          </fieldset>
        </div>

        <div className="btn-submit-container">
          <button type="submit" className="btn btn-large">
            Create Event
          </button>
        </div>
      </form>
    </>
  );
};

export default EditEvent;
