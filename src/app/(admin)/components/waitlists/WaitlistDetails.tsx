//TODO Add move mutation

import useDeleteWaitlist from '@/hooks/waitlists/useDeleteWaitlist';
import useUpdateWaitlist from '@/hooks/waitlists/useUpdateWaitlist';
import { WaitlistClient } from '@/utils/types/waitlists';
import { useEffect, useState } from 'react';

interface WaitlistDetailsProps {
  waitlist: WaitlistClient | null;
  setSelectedWaitlist: (value: WaitlistClient | null) => void;
  setIsModalOpen: (value: boolean) => void;
}

const WaitlistDetails = ({
  waitlist,
  setSelectedWaitlist,
  setIsModalOpen,
}: WaitlistDetailsProps) => {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(waitlist?.contact.firstName);
  const [lastName, setLastName] = useState(waitlist?.contact.lastName);
  const [email, setEmail] = useState(waitlist?.contact.email);
  const [additionalInfo, setAdditionalInfo] = useState(
    waitlist?.additionalInfo
  );
  const [adminNotes, setAdminNotes] = useState(waitlist?.adminNotes);
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { mutateAsync: deleteMutate, status: deleteStatus } =
    useDeleteWaitlist();
  const { mutateAsync: updateMutate, status: updateStatus } =
    useUpdateWaitlist();

  useEffect(() => {
    if (waitlist) {
      setFirstName(waitlist.contact.firstName);
      setLastName(waitlist.contact.lastName);
      setEmail(waitlist.contact.email);
      setAdditionalInfo(waitlist.additionalInfo);
      setAdminNotes(waitlist.adminNotes);
    }
  }, [waitlist]);

  if (!waitlist) {
    return (
      <>
        <h3>no Waitlist selected</h3>
      </>
    );
  }

  const saveEdits = async () => {
    const data = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
      additionalInfo: additionalInfo,
      adminNotes: adminNotes,
    };
    try {
      await updateMutate({
        url: `/api/events/${waitlist?.eventId}/bookings/${waitlist?.id}`,
        updateData: data,
      });
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const cancelEdits = () => {
    setEditing(false);
    setFirstName(waitlist?.contact.firstName);
    setLastName(waitlist?.contact.lastName);
    setEmail(waitlist?.contact.email);
    setAdditionalInfo(waitlist?.additionalInfo);
    setAdminNotes(waitlist?.adminNotes);
  };

  const deleteBookingClick = async () => {
    if (
      confirm(
        'Are you sure you want to delete this waitlist? This process is irreversible'
      )
    ) {
      try {
        await deleteMutate(
          `/api/events/${waitlist?.eventId}/bookings/${waitlist?.id}`
        );
        setSelectedWaitlist(null);
        setIsModalOpen(false);
      } catch (error) {
        setError((error as Error).message);
      }
    } else return;
  };

  return (
    <>
      <div className="booking-details">
        {deleteStatus == 'loading' && (
          <h3 className="center">Deleting Waitlist...</h3>
        )}
        {updateStatus == 'loading' && (
          <h3 className="center">Updating Waitlist...</h3>
        )}

        {error && <h3 className="center error">{error}</h3>}

        <div className="button-container">
          {editing ? (
            <>
              <button onClick={saveEdits} className="btn">
                Save
              </button>
              <button onClick={cancelEdits} className="btn">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="btn">
              Edit
            </button>
          )}
          <button className="btn btn-delete" onClick={deleteBookingClick}>
            Delete
          </button>
        </div>
        <div className="tables-container">
          <table className="sub-table">
            <caption>Contact information</caption>
            <tbody>
              <tr>
                <th>First Name</th>
                <td>
                  <input
                    disabled={!editing}
                    type="text"
                    defaultValue={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>
                  <input
                    disabled={!editing}
                    type="text"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  <input
                    disabled={!editing}
                    type="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="booking-details-info-container">
          <div className="textarea-container">
            <label htmlFor="additional-info">Additional Information</label>
            <textarea
              name="additional-info"
              id="additional-info"
              defaultValue={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              disabled={!editing}
            />
          </div>

          <div className="textarea-container">
            <label htmlFor="admin-notes">Admin Notes</label>
            <textarea
              name="admin-notes"
              id="admin-notes"
              defaultValue={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              disabled={!editing}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitlistDetails;
