import { BookingPageProps } from '@/lib/interfaces';

const BookingPageThree = ({ prevPage, userChoices }: BookingPageProps) => {
  return (
    <>
      <h3>Payment will be done here, then booking submitted</h3>
      <div className="button-container">
        <button onClick={prevPage} className="btn btn-secondary">
          Previous
        </button>
        {/* <button className="btn btn-primary">Next</button> */}
      </div>
    </>
  );
};

export default BookingPageThree;
