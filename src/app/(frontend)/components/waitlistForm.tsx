import useCreateWaitlist from '@/hooks/waitlists/useCreateWaitlist';
import { EventClient } from '@/utils/types/events';
import { CreateWaitlistData } from '@/utils/types/waitlists';
import { useState } from 'react';
import validator from 'validator';

interface WaitlistFormProps {
  event: EventClient;
}

const WaitlistForm = ({ event }: WaitlistFormProps) => {
  const [choices, setChoices] = useState<CreateWaitlistData>({
    contact: {
      firstName: '',
      lastName: '',
      email: '',
    },
    totalTickets: 1,
    additionalInfo: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [formsubmitted, setFormSubmitted] = useState(false);

  const { mutateAsync: createMutate, status } = useCreateWaitlist();

  const updateChoices = (key: string, value: string) => {
    setChoices((prevChoices) => {
      switch (key) {
        case 'firstName':
          return {
            ...prevChoices,
            contact: { ...prevChoices.contact, firstName: value },
          };
        case 'lastName':
          return {
            ...prevChoices,
            contact: { ...prevChoices.contact, lastName: value },
          };
        case 'email':
          return {
            ...prevChoices,
            contact: { ...prevChoices.contact, email: value },
          };
        case 'tickets':
          return { ...prevChoices, totalTickets: parseInt(value) };
        case 'additionalInfo':
          return { ...prevChoices, additionalInfo: value };
        default:
          return prevChoices;
      }
    });
  };

  const submitForm = async () => {
    setEmptyFields([]);
    setError(null);
    const newEmptyFields = [];
    if (choices.contact.firstName.trim() == '') {
      newEmptyFields.push('firstName');
    }
    if (choices.contact.lastName.trim() == '') {
      newEmptyFields.push('lastName');
    }
    if (choices.contact.email.trim() == '') {
      newEmptyFields.push('email');
    }
    if (newEmptyFields.length > 0) {
      setEmptyFields(newEmptyFields);
      setError('Please fill in all required fields');
      return;
    }

    if (!validator.isEmail(choices.contact.email)) {
      setEmptyFields(['email']);
      setError('Please enter a valid email');
      return;
    }

    try {
      await createMutate({
        url: `/api/events/${event.id}/waitlists`,
        waitlistData: choices,
      });
      setFormSubmitted(true);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <>
      {formsubmitted ? (
        <>
          <h3>
            Thank you for submitting the form. If a place opens up we will
            contact you directly by email
          </h3>
        </>
      ) : (
        <form className="waitlist-form">
          <fieldset className="contact">
            <label>
              Name <span className="required">*</span>
            </label>
            <div className="name-input-container">
              <input
                className={emptyFields.includes('firstName') ? 'invalid' : ''}
                type="text"
                placeholder="First"
                onChange={(e) => {
                  updateChoices('firstName', e.target.value);
                }}
                defaultValue={choices.contact.firstName}
              ></input>
              <input
                className={emptyFields.includes('lastName') ? 'invalid' : ''}
                type="text"
                placeholder="Last"
                onChange={(e) => {
                  updateChoices('lastName', e.target.value);
                }}
                defaultValue={choices.contact.lastName}
              ></input>
            </div>
            <label>
              Email <span className="required">*</span>
            </label>
            <input
              className={emptyFields.includes('email') ? 'invalid' : ''}
              type="email"
              placeholder="john@mail.com"
              onChange={(e) => {
                updateChoices('email', e.target.value);
              }}
              defaultValue={choices.contact.email}
            ></input>
            {event.allowMultipleTickets && (
              <>
                <label htmlFor="tickets">
                  Number of Tickets <span className="required">*</span>
                </label>
                <select
                  name="tickets"
                  defaultValue="0"
                  onChange={(e) => updateChoices('tickets', e.target.value)}
                >
                  <option value="0" hidden disabled>
                    --select number--
                  </option>
                  <option value={'1'}>1</option>
                  <option value={'2'}>2</option>
                  <option value={'3'}>3</option>
                  <option value={'4'}>4</option>
                  <option value={'5'}>5</option>
                  <option value={'6'}>6</option>
                  <option value={'7'}>7</option>
                  <option value={'8'}>8</option>
                  <option value={'9'}>9</option>
                  <option value={'10'}>10</option>
                </select>
              </>
            )}
            <label htmlFor="additional-info">Additional Info</label>
            <textarea
              name="additional-info"
              onChange={(e) => updateChoices('additionalInfo', e.target.value)}
              defaultValue={choices.additionalInfo}
            />
          </fieldset>
          {error && <h3 className="center error">{error}</h3>}
          <button
            className="btn btn-primary"
            type="button"
            onClick={submitForm}
          >
            Submit
          </button>
          {status == 'loading' && (
            <h3 className="center">submitting form...</h3>
          )}
        </form>
      )}
    </>
  );
};

export default WaitlistForm;
