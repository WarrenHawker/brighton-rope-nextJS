import ClaimUserForm from '../components/users/ClaimUserForm';

const NewUser = () => {
  return (
    <div>
      <h1 className="page-title">Welcome to the Brighton Rope admin panel</h1>
      <h2>Before you can view everything, please fill in the form below</h2>
      <ClaimUserForm />
    </div>
  );
};

export default NewUser;
