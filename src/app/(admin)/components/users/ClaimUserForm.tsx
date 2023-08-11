'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import validator from 'validator';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import MDEditor from '@uiw/react-md-editor';
import useClaimUser from '@/hooks/users/useClaimUser';
import { Position } from '@/utils/interfaces';

const ClaimUserForm = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [accountData, setAccountData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [bioDescription, setBioDescription] = useState<string | undefined>('');
  const [bioData, setBioData] = useState({
    public: false,
    name: '',
    pronouns: '',
    position: '',
  });
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: claimMutate, status: claimStatus } = useClaimUser();

  const handleChange = (field: string, value: string | boolean) => {
    if (typeof value == 'boolean') {
      setBioData((prev) => ({ ...prev, public: value }));
      return;
    }
    if (typeof value == 'string' && !validator.isEmpty(value)) {
      setEmptyFields((prev) => prev.filter((item) => item != field));
    }
    switch (field) {
      case 'account name':
        setAccountData((prev) => ({ ...prev, name: value.toString() }));
        break;
      case 'password':
        setAccountData((prev) => ({ ...prev, password: value.toString() }));
        break;
      case 'confirm password':
        setAccountData((prev) => ({
          ...prev,
          confirmPassword: value.toString(),
        }));
        break;
      case 'bio name':
        setBioData((prev) => ({ ...prev, name: value.toString() }));
        break;
      case 'pronouns':
        setBioData((prev) => ({ ...prev, pronouns: value.toString() }));
        break;
      case 'position':
        setBioData((prev) => ({ ...prev, position: value.toString() }));
        break;
      default:
        break;
    }
  };

  const submitForm = async () => {
    setError(null);
    const newEmptyFields = [];
    //check if any required fields are empty, and push empty fields to array
    if (validator.isEmpty(accountData.name)) {
      newEmptyFields.push('account name');
    }
    if (validator.isEmpty(accountData.password)) {
      newEmptyFields.push('password');
    }
    if (validator.isEmpty(accountData.confirmPassword)) {
      newEmptyFields.push('confirm password');
    }
    if (validator.isEmpty(bioData.name)) {
      newEmptyFields.push('bio name');
    }
    if (validator.isEmpty(bioData.pronouns)) {
      newEmptyFields.push('pronouns');
    }
    if (validator.isEmpty(bioData.position)) {
      newEmptyFields.push('position');
    }

    //show error if any fields are empty
    if (newEmptyFields.length > 0) {
      setError('Please fill in all required fields');
      setEmptyFields(newEmptyFields);
      return;
    }

    //show error is password isn't strong
    if (!validator.isStrongPassword(accountData.password)) {
      setError(
        'passwords need to be at least 8 characters long and contain at least 1 symbol and 1 upper case letter'
      );
      return;
    }

    //show error if password fields don't match
    if (accountData.password != accountData.confirmPassword) {
      setError('the specified passwords do not match');
      return;
    }

    const data = {
      accountEmail: session?.user.email,
      accountName: accountData.name,
      accountPassword: accountData.password,
      bio: {
        public: bioData.public,
        name: bioData.name,
        pronouns: bioData.pronouns,
        position: bioData.position as Position,
        description: bioDescription || '',
        imageUrl: imageUrl,
      },
    };

    try {
      await claimMutate(data);
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const [imageUrl, setImageUrl] = useState('');

  return (
    <>
      <form autoComplete="off">
        <fieldset>
          <legend>Account details</legend>
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            className={emptyFields.includes('account name') ? 'invalid' : ''}
            type="text"
            autoComplete="username"
            name="name"
            defaultValue={accountData.name}
            onChange={(e) => handleChange('account name', e.target.value)}
          />

          <label htmlFor="new-password">
            New Password <span className="required">*</span>
          </label>
          <input
            className={emptyFields.includes('password') ? 'invalid' : ''}
            type="password"
            name="new-password"
            autoComplete="new-password"
            defaultValue={accountData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />

          <label htmlFor="confirm-new-password">
            Confirm New Password <span className="required">*</span>
          </label>
          <input
            className={
              emptyFields.includes('confirm password') ? 'invalid' : ''
            }
            type="password"
            name="confirm-new-password"
            defaultValue={accountData.confirmPassword}
            onChange={(e) => handleChange('confirm password', e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Teacher Bio</legend>
          <div className="checkbox-container">
            <label htmlFor="public">
              Make bio public? <br />
              <span>
                (ticking the box will display your bio on the about us page)
              </span>
            </label>
            <input
              type="checkbox"
              name="public"
              defaultChecked={bioData.public}
              onChange={(e) => {
                handleChange('public', e.target.checked);
              }}
            />
          </div>

          <label htmlFor="bio-name">
            Display Name <span className="required">*</span>
          </label>
          <input
            className={emptyFields.includes('bio name') ? 'invalid' : ''}
            type="text"
            name="bio-name"
            defaultValue={bioData.name}
            onChange={(e) => handleChange('bio name', e.target.value)}
          />

          <label htmlFor="pronouns">
            Pronouns <span className="required">*</span>
          </label>
          <input
            className={emptyFields.includes('pronouns') ? 'invalid' : ''}
            type="text"
            name="pronouns"
            defaultValue={bioData.pronouns}
            onChange={(e) => handleChange('pronouns', e.target.value)}
          />

          <label htmlFor="position">
            Rope Position <span className="required">*</span>
          </label>
          <select
            className={emptyFields.includes('position') ? 'invalid' : ''}
            name="position"
            defaultValue={bioData.position}
            onChange={(e) => handleChange('position', e.target.value)}
          >
            <option value="" disabled hidden>
              -- Select Position --
            </option>
            <option value="RIGGER">Rigger</option>
            <option value="SWITCH">Switch</option>
            <option value="BOTTOM">Bottom</option>
            <option value="OTHER">Other</option>
          </select>
        </fieldset>
        {claimStatus == 'loading' && (
          <h3 className="center">Updating User Profile...</h3>
        )}
        {error ? <p className="error">{error}</p> : null}
        <div className="description-container">
          <label className="description-label">
            Teacher Bio Description <span className="required">*</span>
          </label>
          <MDEditor value={bioDescription} onChange={setBioDescription} />
        </div>

        <fieldset className="image-fieldset">
          <legend>Bio Profile Picture</legend>
          <div>
            <label>Image URL</label>
            <textarea
              defaultValue={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div>
            <label>Preview</label>
            <img src={imageUrl} />
          </div>
        </fieldset>
        {claimStatus == 'loading' && (
          <h3 className="center">Updating User Profile...</h3>
        )}
        {error ? <p className="error">{error}</p> : null}
        <div className="button-container">
          <button type="button" className="btn btn-large" onClick={submitForm}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ClaimUserForm;
