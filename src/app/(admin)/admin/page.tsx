import useUsers from '@/hooks/users/useFetchUsers';
import AdminEvents from '../views/Events';

const AdminHome = async () => {
  return (
    <>
      <AdminEvents />
    </>
  );
};

export default AdminHome;
