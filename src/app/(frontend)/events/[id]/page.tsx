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
    dateTimes: JSON.parse(data.event.dateTimes),
    allowMultipleTickets: data.event.allowMultipleTickets,
    prices: JSON.parse(data.event.prices),
  };

  return event;
};

const SingleEvent = async ({ params }) => {
  const event = await fetchEvent(params.id);
  return (
    <main>
      <h1 className="page-title">{event.location.lineOne}</h1>
    </main>
  );
};

export default SingleEvent;
