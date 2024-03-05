import { useState } from 'react';
import { actions } from '../../actions';
import CheckIcon from '../../assets/icons/check.svg';
import EditIcon from '../../assets/icons/edit.svg';
import useAxios from '../../hooks/useAxios';
import useProfile from '../../hooks/useProfile';

export default function Bio() {
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);
  const { api } = useAxios();

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { bio },
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_BIO_EDITED,
          data: response.data,
        });
      }

      setEditMode(false);
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">{bio}</p>
        ) : (
          <textarea
            className="p-2 leading-[188%] text-gray-600 lg:text-lg rounded-md"
            value={bio}
            rows={4}
            cols={65}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>

      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="flex-center bottom-4 right-4 h-7 w-7 rounded-full hover:bg-black/50">
          <img src={EditIcon} alt="Edit-icon" />
        </button>
      ) : (
        <button
          onClick={handleBioEdit}
          className="flex-center bottom-4 right-4 h-7 w-7 rounded-full hover:bg-black/50">
          <img src={CheckIcon} alt="check-icon" />
        </button>
      )}
    </div>
  );
}
