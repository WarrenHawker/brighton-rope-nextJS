import { BookingPageProps } from '@/utils/interfaces';
import { FormEvent } from 'react';

interface BookingPageThreeProps extends BookingPageProps {
  submitForm: (e: FormEvent) => void;
}

const BookingPageThree = ({
  prevPage,
  userChoices,
  submitForm,
}: BookingPageThreeProps) => {
  return (
    <>
      <h3>Payment will be done here, then booking submitted</h3>
      <div className="button-container">
        <button onClick={prevPage} className="btn btn-secondary">
          Previous
        </button>
        <button className="btn btn-primary" onClick={submitForm}>
          Submit Form
        </button>
      </div>
    </>
  );
};

export default BookingPageThree;
