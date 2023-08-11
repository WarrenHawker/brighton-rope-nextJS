import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session, getServerSession } from 'next-auth';
import UserDetails from '../../components/users/UserDetails';
import { headers } from 'next/headers';

const fetchUser = async (url: string) => {
  const res = await fetch(url, { method: 'GET', headers: headers() });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data.user;
};

const AdminProfile = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const host = headers().get('host');
  const protocal = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
  const user = await fetchUser(
    `${protocal}://${host}/api/users/${session?.user.email}`
  );

  if (session?.user.role == 'INACTIVE' || !session?.user.role) {
    return (
      <>
        <h1 className="page-title">Admin Profile</h1>
        <h2 className="error">
          I&apos;m sorry, you don&apos;t have access to this page. Please
          contact the Super Admin
        </h2>
      </>
    );
  }

  return (
    <>
      <h1 className="page-title">Admin Profile</h1>
      <div>
        <UserDetails user={user} role={session?.user.role} />
      </div>
    </>
  );
};

export default AdminProfile;
