import { fetchEventByIdServer } from '@/utils/serverFetch';
import SingleEventDetails from '../../components/SingleEventDetails';
import getQueryClient from '@/lib/react-query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { ReactQueryHydrate } from '@/lib/react-query/ReactQueryHydrate';

interface SingleEventProps {
  params: {
    id: string;
  };
}

const SingleEvent = async ({ params }: SingleEventProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['events', params.id], () =>
    fetchEventByIdServer(params.id)
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <ReactQueryHydrate state={dehydratedState}>
      <SingleEventDetails eventId={params.id} />
    </ReactQueryHydrate>
  );
};

export default SingleEvent;
