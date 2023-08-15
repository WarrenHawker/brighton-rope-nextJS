import { EventClient } from '@/utils/types/events';

//TODO Create Waitlist form

interface WaitlistFormProps {
  event: EventClient;
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
