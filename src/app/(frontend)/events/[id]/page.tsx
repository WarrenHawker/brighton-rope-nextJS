import SingleEventDetails from '../../components/SingleEventDetails';
import getQueryClient from '@/lib/react-query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { ReactQueryHydrate } from '@/lib/react-query/ReactQueryHydrate';
import { headers } from 'next/headers';
import { decodeEvent } from '@/utils/functions';

interface SingleEventProps {
  params: {
    id: string;
  };
}

const fetchEvent = async (id: string) => {
  const host = headers().get('host');
  const protocal = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
  const res = await fetch(`${protocal}://${host}/api/events/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  } else {
    const event = decodeEvent(data.event);
    return event;
  }
};

const SingleEvent = async ({ params }: SingleEventProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['events', params.id], () =>
    fetchEvent(params.id)
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <ReactQueryHydrate state={dehydratedState}>
      <SingleEventDetails eventId={parseInt(params.id)} />
    </ReactQueryHydrate>
  );
};

export default SingleEvent;
