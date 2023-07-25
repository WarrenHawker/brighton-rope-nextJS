import RegisterForm from '../../components/auth/registerForm';
import UsersList from '../../components/auth/usersList';

const AdminUsers = () => {
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
