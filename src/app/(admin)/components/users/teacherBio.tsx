'use client';

import useUpdateTeacher from '@/hooks/teachers/useUpdateTeacher';
import { getFullDate } from '@/utils/functions';
import { TeacherDB } from '@/utils/interfaces';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import validator from 'validator';

interface TeacherBioProps {
  teacher: TeacherDB;
}

interface EditingData {
  name: string;
  pronouns: string;
  position: string;
  public: boolean;
  imageUrl: string;
}

const TeacherBio = ({ teacher }: TeacherBioProps) => {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<EditingData>({
    name: '',
    pronouns: '',
    position: '',
    imageUrl: '',
    public: teacher.public,
  });
  const [description, setDescription] = useState<string | undefined>(
    decodeURIComponent(teacher.description)
  );

  const { mutateAsync: updateMutate, status: updateStatus } =
    useUpdateTeacher();

  useEffect(() => {
    decodeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacher]);

  const decodeData = async () => {
    const newData = {
      name: validator.unescape(teacher.name),
      pronouns: validator.unescape(teacher.pronouns),
      position: validator.unescape(teacher.position),
      public: teacher.public,
      imageUrl: decodeURIComponent(teacher.imageUrl),
    };
    setEditingData(newData);
  };

  const saveEdit = async () => {
    setEditing(false);
  };

  const cancelEdit = async () => {
    setEditing(false);
  };

  return (
    <>
      <h3 className="center">Teacher Bio</h3>
      <p className="left">
        <strong>Creation Date: </strong>
        {getFullDate(teacher.createdOn)}
      </p>
      <p className="left">
        <strong>Date Last Updated: </strong>
        {teacher.updatedOn ? getFullDate(teacher.updatedOn) : 'never'}
      </p>
      {teacher.updatedBy && (
        <p className="left">
          <strong>Updated By (User): </strong>
          {/* {`id: ${teacher.updatedBy.userId} email: ${teacher.updatedBy.userEmail}`} */}
        </p>
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
