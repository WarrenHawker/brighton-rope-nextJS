'use client';
import CountrySelector from '@/utils/globalComponents/CountrySelector';
import { Address, EventDateTime, Prices } from '@/utils/interfaces';
import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import MDEditor from '@uiw/react-md-editor';
import useCreateEvent, { CreateEventData } from '@/hooks/events/useCreateEvent';
import validator from 'validator';

interface AddEventProps {
  setAddEvent: (value: boolean) => void;
}

const AddEvent = ({ setAddEvent }: AddEventProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<Address>({
    lineOne: '',
    lineTwo: '',
    city: '',
    country: '',
    postcode: '',
  });
  const [maxTickets, setMaxTickets] = useState(0);
  const [allowMultipleTickets, setAllowMultipleTickets] = useState(true);
  const [datesTimes, setDatesTimes] = useState<EventDateTime[]>([
    { date: '', startTime: '', endTime: '', error: null },
  ]);
  const [prices, setPrices] = useState<Prices[]>([]);
  const [isFree, setIsFree] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const { mutateAsync: createMutate, status: createStatus } = useCreateEvent();

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

        <label htmlFor="singleDate">
          Date <span className="required">*</span>
        </label>
        <input
          className={emptyFields?.includes('date') ? 'invalid' : ''}
          type="date"
          name="singleDate"
          value={item.date}
          onChange={(e) => {
            setEmptyFields((prev) => prev?.filter((item) => item != 'date'));
            changeDateTime(e, index, 'date');
          }}
        />

        <div className="time-input-container">
          <div>
            <label htmlFor="singleStartTime">
              Start Time <span className="required">*</span>
            </label>
            <input
              className={emptyFields?.includes('start time') ? 'invalid' : ''}
              type="time"
              name="singleStartTime"
              value={item.startTime}
              onChange={(e) => {
                setEmptyFields((prev) =>
                  prev?.filter((item) => item != 'start time')
                );
                changeDateTime(e, index, 'start');
              }}
            />
          </div>
          <div>
            <label htmlFor="singleEndTime">
              End Time <span className="required">*</span>
            </label>
            <input
              className={emptyFields?.includes('end time') ? 'invalid' : ''}
              type="time"
              value={item.endTime}
              name="singleEndTime"
              onChange={(e) => {
                setEmptyFields((prev) =>
                  prev?.filter((item) => item != 'end time')
                );
                changeDateTime(e, index, 'end');
              }}
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

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setEmptyFields([]);
    const newEmptyFields = [];

    if (validator.isEmpty(title, { ignore_whitespace: true })) {
      newEmptyFields.push('title');
    }
    if (!description) {
      newEmptyFields.push('description');
    } else {
      if (validator.isEmpty(description, { ignore_whitespace: true })) {
        newEmptyFields.push('description');
      }
    }
    if (validator.isEmpty(datesTimes[0].date)) {
      newEmptyFields.push('date');
    }
    if (validator.isEmpty(datesTimes[0].startTime)) {
      newEmptyFields.push('start time');
    }
    if (validator.isEmpty(datesTimes[0].endTime)) {
      newEmptyFields.push('end time');
    }
    if (validator.isEmpty(location.lineOne)) {
      newEmptyFields.push('line one');
    }
    if (validator.isEmpty(location.city)) {
      newEmptyFields.push('city');
    }
    if (validator.isEmpty(location.country)) {
      newEmptyFields.push('country');
    }
    if (validator.isEmpty(location.postcode)) {
      newEmptyFields.push('postcode');
    }
    if (newEmptyFields.length > 0) {
      setError('please fill in all required fields');
      setEmptyFields(newEmptyFields);
      return;
    }

    if (!isFree && prices.length == 0) {
      setError('paid events must have at least one price bracket');
      return;
    }

    if (!isFree && maxTickets == 0) {
      newEmptyFields.push('max tickets');
      setEmptyFields(newEmptyFields);
      setError(
        'number of tickets available for paid events must be greater than zero'
      );
      return;
    }
    const event: CreateEventData = {
      title: title,
      description: description ? description : '',
      startDate: new Date(datesTimes[0].date),
      dateTimes: datesTimes,
      location: location,
      isFree: isFree,
    };

    if (!event.isFree) {
      event.prices = prices;
      event.allowMultipleTickets = allowMultipleTickets;
      event.maxTickets = maxTickets;
    }

    try {
      await createMutate({ url: '/api/events', eventData: event });
      setAddEvent(false);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <>
      <form onSubmit={(e) => submitForm(e)} className="add-event-form">
        <input
          className={
            emptyFields?.includes('title')
              ? 'title-input invalid'
              : 'title-input'
          }
          type="text"
          name="title"
          defaultValue={title}
          onChange={(e) => {
            setEmptyFields((prev) => prev?.filter((item) => item != 'title'));
            setTitle(e.target.value);
          }}
          placeholder="Add title"
        />

        <div
          className={
            emptyFields?.includes('description')
              ? 'description-container invalid'
              : 'description-container'
          }
          onInput={() =>
            setEmptyFields((prev) =>
              prev?.filter((item) => item != 'description')
            )
          }
        >
          <label className="description-label">
            Description <span className="required">*</span>
          </label>
          <MDEditor
            height={200}
            value={description}
            onChange={setDescription}
          />
        </div>
        <fieldset className="full-width-fieldset">
          <legend>Is this event free or paid?</legend>
          <div>
            <label className="toggle">
              <input
                type="checkbox"
                defaultChecked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
              />
              <span className="slider"></span>
              <span className="labels" data-on="Free" data-off="Paid"></span>
            </label>
          </div>
        </fieldset>
        <div className="form-column">
          <fieldset className="location">
            <legend>Location</legend>
            <label htmlFor="lineOne">
              Street Address <span className="required">*</span>
            </label>
            <input
              className={emptyFields?.includes('line one') ? 'invalid' : ''}
              type="text"
              name="lineOne"
              defaultValue={location.lineOne}
              onChange={(e) => {
                setEmptyFields((prev) =>
                  prev?.filter((item) => item != 'line one')
                );
                changeLocation(e);
              }}
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

            <label htmlFor="city">
              City <span className="required">*</span>
            </label>
            <input
              className={emptyFields?.includes('city') ? 'invalid' : ''}
              type="text"
              name="city"
              defaultValue={location.city}
              onChange={(e) => {
                setEmptyFields((prev) =>
                  prev?.filter((item) => item != 'city')
                );
                changeLocation(e);
              }}
            />

            <label htmlFor="country">
              Country <span className="required">*</span>
            </label>

            <CountrySelector
              value={location.country}
              changeHandler={(e: any) => {
                setEmptyFields((prev) =>
                  prev?.filter((item) => item != 'country')
                );
                changeLocation(e);
              }}
              styles={emptyFields?.includes('country') ? 'invalid' : ''}
            />

            <label htmlFor="postcode">
              ZIP/postcode <span className="required">*</span>
            </label>
            <input
              className={emptyFields?.includes('postcode') ? 'invalid' : ''}
              type="text"
              name="postcode"
              defaultValue={location.postcode}
              onChange={(e) => {
                setEmptyFields((prev) =>
                  prev?.filter((item) => item != 'postcode')
                );
                changeLocation(e);
              }}
            />
          </fieldset>

          {!isFree ? (
            <fieldset>
              <legend>Price brackets</legend>
              {pricesDisplay}
              <button
                type="button"
                onClick={(e) => addPrice(e)}
                className="btn"
              >
                Add new price bracket
              </button>
            </fieldset>
          ) : null}
        </div>

        <div className="form-column">
          {!isFree ? (
            <fieldset className="event-details-fields">
              <legend>Event Details</legend>
              <label htmlFor="capacity">
                Number of tickets available <span className="required">*</span>
              </label>
              <input
                className={emptyFields.includes('max tickets') ? 'invalid' : ''}
                type="number"
                name="capacity"
                defaultValue={maxTickets}
                onChange={(e) => {
                  setEmptyFields((prev) =>
                    prev?.filter((item) => item != 'max tickets')
                  );
                  setMaxTickets(parseInt(e.target.value));
                }}
                min="0"
              />
              <div className="toggle-container">
                <label className="label-main">
                  Allow customer to buy multiple tickets?
                </label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    defaultChecked={allowMultipleTickets}
                    onChange={(e) => setAllowMultipleTickets(e.target.checked)}
                  />
                  <span className="slider"></span>
                  <span className="labels" data-on="Yes" data-off="No"></span>
                </label>
              </div>
            </fieldset>
          ) : null}

          <fieldset>
            <legend>Dates and Times</legend>
            {datesTimesDisplay}
            <button type="button" onClick={addDateTime} className="btn">
              Add new day to event
            </button>
          </fieldset>
        </div>
        {createStatus == 'loading' && (
          <h3 className="center">Creating new Event...</h3>
        )}
        {error && <h3 className="center error">{error}</h3>}

        <div className="btn-submit-container">
          <button type="submit" className="btn btn-large">
            Create Event
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEvent;
