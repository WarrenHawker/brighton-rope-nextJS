import { EventsData } from '@/utils/interfaces';

interface WaitingListFormProps {
  event: EventsData;
}

const WaitingListForm = ({ event }: WaitingListFormProps) => {
  return (
    <>
      <form>
        <h2>waiting list form</h2>
      </form>
    </>
  );
};

export default WaitingListForm;
