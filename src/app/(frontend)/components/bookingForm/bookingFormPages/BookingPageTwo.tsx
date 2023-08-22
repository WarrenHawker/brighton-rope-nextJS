import { BookingPageProps } from '@/utils/types/bookings';
import { MouseEvent, useRef, useState } from 'react';
import validator from 'validator';

interface PageTwoProps extends BookingPageProps {
  updateUserChoices: (option: string, value: string | number) => void;
}

const BookingPageTwo = ({
  nextPage,
  prevPage,
  updateUserChoices,
  userChoices,
}: PageTwoProps) => {
  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const nextPageClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newEmptyFields = [];
    if (firstNameInput.current!.value == '') {
      newEmptyFields.push('firstName');
    }
    if (lastNameInput.current!.value == '') {
      newEmptyFields.push('lastName');
    }
    if (emailInput.current!.value == '') {
      newEmptyFields.push('email');
    }
    if (newEmptyFields.length > 0) {
      setError('Please fill in all required fields');
      setEmptyFields(newEmptyFields);
      return;
    }
    if (!validator.isEmail(emailInput.current!.value)) {
      setError('please enter valid email');
      return;
    }
    nextPage();
  };

  const resetEmptyField = (field: string): void => {
    setEmptyFields((prevFields) => {
      return prevFields.filter((item) => item != field);
    });
  };

  return (
    <div className="booking-form-page">
      <fieldset className="contact">
        <h4>Add your contact information to the booking</h4>
        <label>
          Name <span className="required">*</span>
        </label>
        <div className="name-input-container">
          <input
            className={emptyFields.includes('firstName') ? 'invalid' : ''}
            type="text"
            placeholder="First"
            onChange={(e) => {
              updateUserChoices('firstName', e.target.value);
              resetEmptyField('firstName');
            }}
            value={userChoices.contact.firstName}
            ref={firstNameInput}
          ></input>
          <input
            className={emptyFields.includes('lastName') ? 'invalid' : ''}
            type="text"
            placeholder="Last"
            onChange={(e) => {
              updateUserChoices('lastName', e.target.value);
              resetEmptyField('lastName');
            }}
            value={userChoices.contact.lastName}
            ref={lastNameInput}
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
            updateUserChoices('email', e.target.value);
            resetEmptyField('email');
          }}
          value={userChoices.contact.email}
          ref={emailInput}
        ></input>
        <label>Additional Info</label>
        <textarea
          onChange={(e) => updateUserChoices('additionalInfo', e.target.value)}
          value={userChoices.additionalInfo}
        />
      </fieldset>
      {error ? <p className="error">{error}</p> : null}
      <div className="button-container">
        <button onClick={prevPage} className="btn btn-secondary">
          Previous
        </button>
        <button onClick={(e) => nextPageClick(e)} className="btn btn-primary">
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingPageTwo;
