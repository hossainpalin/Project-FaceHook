import { useRef } from 'react';
import { actions } from '../../actions';
import EditIcon from '../../assets/icons/edit.svg';
import useAxios from '../../hooks/useAxios';
import useProfile from '../../hooks/useProfile';
import { getRandomColor } from '../../utils/getInitialImage';

export default function ProfileImage() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const fileUploadRef = useRef(null);

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener('change', updateImage);
    fileUploadRef.current.click();
  };

  const updateImage = async () => {
    try {
      const formData = new FormData();
      for (let file of fileUploadRef.current.files) {
        formData.append('avatar', file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}/avatar`,
        formData,
      );

      if (response.status === 200) {
        dispatch({ type: actions.profile.IMAGE_UPDATED, data: response.data });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="relative mb-8 h-[180px] w-[180px] lg:mb-11 lg:h-[218px] lg:w-[218px]">
      <div className="w-full h-full rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={state?.user?.avatar}
          alt="Avatar"
        />
      </div>

      <form>
        <button
          onClick={handleImageUpload}
          type="submit"
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80">
          <img src={EditIcon} alt="Edit-icon" />
        </button>
        <input type="file" id="file" ref={fileUploadRef} hidden />
      </form>
    </div>
  );
}
