import { BookingPageProps } from '../../../../lib/interfaces';

const BookingPageThree = ({ prevPage, userChoices }: BookingPageProps) => {
  return (
    <>
      <h3>booking page 3</h3>
      <div className="button-container">
        <button onClick={prevPage} className="btn btn-secondary">
          Previous
        </button>
        <button className="btn btn-primary">Next</button>
      </div>
    </>
  );
};

export default BookingPageThree;
