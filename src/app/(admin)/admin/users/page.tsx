import { getServerSession } from 'next-auth';
import RegisterForm from '../../components/users/RegisterUserForm';
import UsersList from '../../components/users/UsersList';
import { Session } from '@/utils/interfaces';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const AdminUsers = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (session?.user.role != 'SUPERADMIN') {
    return (
      <>
        <h1 className="page-title">Users</h1>
        <h2 className="error">
          I&apos;m sorry, you don&apos;t have access to this page. Please
          contact the Super Admin
        </h2>
      </>
    );
  }
  return (
    <>
      <h1 className="page-title">Users</h1>
      <aside>
        <RegisterForm />
      </aside>
      <main>
        <UsersList />
      </main>
    </>
  );
};

export default AdminUsers;
