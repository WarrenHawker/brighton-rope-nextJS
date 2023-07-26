import { EventsData } from '@/utils/interfaces';

interface WaitlistFormProps {
  event: EventsData;
}

const WaitlistForm = ({ event }: WaitlistFormProps) => {
  return (
    <>
      <form>
        <h2>waiting list form</h2>
      </form>
    </>
  );
};

export default WaitlistForm;
