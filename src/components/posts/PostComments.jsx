import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAvatar from '../../hooks/useAvatar';
import useAxios from '../../hooks/useAxios';
import useNameAvatar from '../../hooks/useNameAvatar';
import useProfile from '../../hooks/useProfile';
import PostCommentList from './PostCommentList';

export default function PostComments({ post }) {
  const [showCommentList, setShowCommentList] = useState(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const { api } = useAxios();
  const { avatarUrl } = useAvatar();
  const { state } = useProfile();
  const { auth } = useAuth();
  const user = state?.user ?? auth?.user;
  const nameAvatar = useNameAvatar();

  const addComment = async (e) => {
    const keyCode = e.keyCode;

    try {
      if (keyCode === 13) {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment },
        );

        if (response.status === 200) {
          setComments([...response.data.comments]);
          setShowCommentList(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={user?.avatar === null ? nameAvatar : avatarUrl}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComment(e)}
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={() => setShowCommentList(!showCommentList)}
          className="text-gray-300 max-md:text-sm">
          All Comment ▾
        </button>
      </div>
      {showCommentList && <PostCommentList comments={comments} />}
    </div>
  );
}
