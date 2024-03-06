import { useState } from 'react';
import { actions } from '../../actions';
import ThreeDotIcon from '../../assets/icons/3dots.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import TimeIcon from '../../assets/icons/time.svg';
import useAuth from '../../hooks/useAuth';
import useAvatar from '../../hooks/useAvatar';
import useAxios from '../../hooks/useAxios';
import useNameAvatar from '../../hooks/useNameAvatar';
import usePost from '../../hooks/usePost';
import { getDateDifferenceFromNow } from '../../utils';

export default function PostHeader({ post }) {
  const [showAction, setShowAction] = useState(false);
  const { avatarUrl } = useAvatar(post);
  const { auth } = useAuth();
  const isMe = post?.author?.id === auth?.user?.id;
  const { api } = useAxios();
  const { dispatch } = usePost();
  const nameAvatar = useNameAvatar();

  const handleDeletePost = async () => {
    dispatch({ type: actions.post.DATA_FETCHING });
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`,
      );
      if (response.status === 200) {
        dispatch({ type: actions.post.POST_DELETED, data: post.id });
      }
    } catch (error) {
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
    }
  };

  const handleEditPost = () => {};

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={
            isMe && (post?.author?.avatar ?? auth?.user?.avatar) === null
              ? nameAvatar
              : avatarUrl
          }
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {getDateDifferenceFromNow(post?.createAt)} ago
            </span>
          </div>
        </div>
      </div>
      <div className="relative">
        {isMe && (
          <button onClick={() => setShowAction(!showAction)}>
            <img src={ThreeDotIcon} alt="3dots of Action" />
          </button>
        )}
        {showAction && (
          <div className="action-modal-container">
            <button
              onClick={handleEditPost}
              className="action-menu-item hover:text-lwsGreen">
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              onClick={handleDeletePost}
              className="action-menu-item hover:text-red-500">
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
