import SingleEventDetails from '../../components/singleEventDetails';

const fetchEvent = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/events/${id}`);
  const data = await res.json();

  const event = {
    id: data.event.id,
    title: data.event.title,
    description: data.event.description,
    location: JSON.parse(data.event.location),
    maxTickets: data.event.maxTickets,
    ticketsSold: data.event.ticketsSold,
    ticketsRemaining: data.event.ticketsRemaining,
    startDate: data.event.startDate,
    dateTimes: JSON.parse(data.event.dateTimes),
    allowMultipleTickets: data.event.allowMultipleTickets,
    prices: JSON.parse(data.event.prices),
  };

  return event;
};

interface SingleEventProps {
  params: {
    id: string;
  };
}

const SingleEvent = async ({ params }: SingleEventProps) => {
  const event = await fetchEvent(params.id);
  return (
    <main>
      <h1 className="page-title">{event.title}</h1>
      <SingleEventDetails event={event} />
    </main>
  );
};

export default SingleEvent;
