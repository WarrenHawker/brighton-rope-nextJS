'use client';

import { FormEvent, useRef, useState } from 'react';
import validator from 'validator';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const messageInput = useRef<HTMLTextAreaElement>(null);

  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const [formSent, setFormSent] = useState(false);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    const newEmptyFields = [];
    if (nameInput.current!.value == '' || nameInput.current!.value == ' ') {
      newEmptyFields.push('name');
    }
    if (emailInput.current!.value == '' || emailInput.current!.value == ' ') {
      newEmptyFields.push('email');
    }
    if (
      messageInput.current!.value == '' ||
      messageInput.current!.value == ' '
    ) {
      newEmptyFields.push('message');
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

    setFormSent(true);
  };

  const resetEmptyField = (field: string): void => {
    setEmptyFields((prevFields) => {
      return prevFields.filter((item) => item != field);
    });
    setError('');
  };

  return (
    <>
      {formSent ? (
        <div className="confirmation">
          <h3>Thank you for your message</h3>
          <p>We will get back to you as soon as we can</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={submitForm}>
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            className={emptyFields.includes('name') ? 'invalid' : ''}
            ref={nameInput}
            name="name"
            type="text"
            defaultValue={name}
            onChange={(e) => {
              setName(e.target.value);
              resetEmptyField('name');
            }}
          />

          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            className={emptyFields.includes('email') ? 'invalid' : ''}
            ref={emailInput}
            name="email"
            type="email"
            defaultValue={email}
            onChange={(e) => {
              setEmail(e.target.value);
              resetEmptyField('email');
            }}
          />

          <label htmlFor="message">
            Message <span className="required">*</span>
          </label>
          <textarea
            className={emptyFields.includes('message') ? 'invalid' : ''}
            ref={messageInput}
            name="message"
            defaultValue={message}
            onChange={(e) => {
              setMessage(e.target.value);
              resetEmptyField('message');
            }}
          />

          {error ? <p className="error">{error}</p> : null}

          <button type="submit" className="btn btn-primary" formNoValidate>
            Send Message
          </button>
        </form>
      )}
    </>
  );
};

export default ContactForm;
