import { fetchEventById } from '@/lib/serverFunctions';
import SingleEventDetails from '../../components/singleEventDetails';

interface SingleEventProps {
  params: {
    id: string;
  };
}

const SingleEvent = async ({ params }: SingleEventProps) => {
  const event = await fetchEventById(params.id);
  return (
    <main>
      <h1 className="page-title">{event.title}</h1>
      <SingleEventDetails event={event} />
    </main>
  );
};

export default SingleEvent;
