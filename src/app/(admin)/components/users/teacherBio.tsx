'use client';

import useFetchTeacher from '@/hooks/teachers/useFetchTeacher';
import useUpdateTeacher from '@/hooks/teachers/useUpdateTeacher';
import { getFullDate } from '@/utils/functions';
import { Position, TeacherUpdateData, UserRole } from '@/utils/interfaces';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import validator from 'validator';

interface TeacherBioProps {
  userEmail: string;
  role?: UserRole;
}

interface EditingData {
  name: string;
  pronouns: string;
  position: string;
  public: boolean;
  imageUrl: string;
}

const TeacherBio = ({ userEmail, role }: TeacherBioProps) => {
  const {
    data: fetchData,
    error: fetchError,
    status: fetchStatus,
  } = useFetchTeacher(userEmail);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<EditingData>({
    name: '',
    pronouns: '',
    position: '',
    imageUrl: '',
    public: true,
  });
  const [description, setDescription] = useState<string | undefined>();
  const nameInput = useRef<HTMLInputElement>(null);
  const pronounsInput = useRef<HTMLInputElement>(null);
  const positionInput = useRef<HTMLSelectElement>(null);
  const publicInput = useRef<HTMLInputElement>(null);
  const imageUrlInput = useRef<HTMLTextAreaElement>(null);

  const { mutateAsync: updateMutate, status: updateStatus } =
    useUpdateTeacher();

  useEffect(() => {
    decodeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, userEmail]);

  const decodeData = () => {
    if (!userEmail || !fetchData) {
      return;
    }
    const newData = {
      name: validator.unescape(fetchData.name),
      pronouns: validator.unescape(fetchData.pronouns),
      position: validator.unescape(fetchData.position),
      public: fetchData.public,
      imageUrl: decodeURIComponent(fetchData.imageUrl),
    };
    setDescription(decodeURIComponent(fetchData.description));
    setEditingData(newData);
  };

  const saveEdit = async () => {
    const updateData: TeacherUpdateData = {};
    if (editingData.name != validator.unescape(fetchData.name)) {
      updateData.name = editingData.name;
    }
    if (editingData.pronouns != validator.unescape(fetchData.pronouns)) {
      updateData.pronouns = editingData.pronouns;
    }
    if (editingData.position != validator.unescape(fetchData.position)) {
      updateData.position = editingData.position as Position;
    }
    if (editingData.public != fetchData.public) {
      updateData.public = editingData.public;
    }
    if (description != decodeURIComponent(fetchData.description)) {
      updateData.description = description;
    }
    if (editingData.imageUrl != decodeURIComponent(fetchData.imageUrl)) {
      updateData.imageUrl = editingData.imageUrl;
    }

    //if no changes found, end function
    if (Object.keys(updateData).length == 0) {
      setEditing(false);
      setError(null);
      return;
    }

    try {
      await updateMutate({
        url: `/api/teachers/${fetchData.email}`,
        updateData,
      });
      setEditing(false);
      setError(null);
      toast.success('teacher updated successfully');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const cancelEdit = () => {
    decodeData();
    setEditing(false);
    nameInput.current!.value = validator.unescape(fetchData.name);
    pronounsInput.current!.value = validator.unescape(fetchData.pronouns);
    positionInput.current!.value = validator.unescape(fetchData.position);
    publicInput.current!.checked = fetchData.public;
    imageUrlInput.current!.value = decodeURIComponent(fetchData.imageUrl);
    setError(null);
  };

  if (fetchStatus == 'loading') {
    return (
      <>
        <h3 className="center">Loading...</h3>
      </>
    );
  }

  if (fetchStatus == 'error') {
    return (
      <>
        <h3 className="center error">{(fetchError as Error).message}</h3>
      </>
    );
  }

  return (
    <>
      <h3 className="center">Teacher Bio</h3>
      {role == 'SUPERADMIN' && (
        <div>
          <p className="left">
            <strong>Creation Date: </strong>
            {fetchData?.createdOn && getFullDate(fetchData.createdOn)}
          </p>
          <p className="left">
            <strong>Date Last Updated: </strong>
            {fetchData?.updatedOn ? getFullDate(fetchData.updatedOn) : 'never'}
          </p>
          {fetchData?.updatedBy && (
            <p className="left">
              <strong>Updated By (User): </strong>
              {`id: ${fetchData.updatedBy.userId} email: ${fetchData.updatedBy.userEmail}`}
            </p>
          )}
        </div>
      )}

      {updateStatus == 'loading' && (
        <p className="center">Updating Profile...</p>
      )}
      {error && <p className="center error">{error}</p>}
      <div className="button-container">
        {editing ? (
          <>
            <button className="btn" onClick={saveEdit}>
              Save
            </button>
            <button className="btn" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn" onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
      </div>
      <table>
        <tbody>
          <tr>
            <th>Display Name</th>
            <td>
              <input
                ref={nameInput}
                type="text"
                defaultValue={editingData.name}
                onChange={(e) =>
                  setEditingData((prev) => ({ ...prev, name: e.target.value }))
                }
                disabled={!editing}
              />
            </td>
          </tr>
          <tr>
            <th>Pronouns</th>
            <td>
              <input
                type="text"
                ref={pronounsInput}
                defaultValue={editingData.pronouns}
                onChange={(e) =>
                  setEditingData((prev) => ({
                    ...prev,
                    pronouns: e.target.value,
                  }))
                }
                disabled={!editing}
              />
            </td>
          </tr>
          <tr>
            <th>Position</th>
            <td>
              <select
                ref={positionInput}
                disabled={!editing}
                name="position"
                defaultValue={editingData.position}
                onChange={(e) =>
                  setEditingData((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }))
                }
              >
                <option value="RIGGER">Rigger</option>
                <option value="SWITCH">Switch</option>
                <option value="BOTTOM">Bottom</option>
                <option value="OTHER">Other</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>is Profile public?</th>
            <td>
              <label className="toggle" style={{ marginTop: '0.5em' }}>
                <input
                  ref={publicInput}
                  disabled={!editing}
                  type="checkbox"
                  defaultChecked={editingData.public}
                  onChange={(e) =>
                    setEditingData((prev) => ({
                      ...prev,
                      public: e.target.checked,
                    }))
                  }
                />
                <span className="slider"></span>
                <span className="labels" data-on="Yes" data-off="No"></span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
      <h4>Description</h4>
      {editing ? (
        <MDEditor value={description} onChange={setDescription} />
      ) : (
        <MDEditor.Markdown source={description} />
      )}
      <fieldset className="image-fieldset">
        <legend>Profile Picture</legend>
        <div>
          <label>Image URL</label>
          <textarea
            ref={imageUrlInput}
            disabled={!editing}
            defaultValue={editingData.imageUrl}
            onChange={(e) =>
              setEditingData((prev) => ({
                ...prev,
                imageUrl: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>Preview</label>
          <img src={editingData.imageUrl} />
        </div>
      </fieldset>
    </>
  );
};

export default TeacherBio;
