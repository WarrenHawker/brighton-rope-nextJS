import SigninForm from '../components/auth/signinForm';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

const AdminLogin = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/admin');
  }
  return (
    <>
      <SigninForm />
    </>
  );
};

export default AdminLogin;
