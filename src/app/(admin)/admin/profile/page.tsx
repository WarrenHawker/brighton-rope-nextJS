import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session, getServerSession } from 'next-auth';

const AdminProfile = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (session?.user.role == 'INACTIVE') {
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
    </>
  );
};

export default AdminProfile;
