import useAuth from './useAuth';
import useProfile from './useProfile';

export default function useAvatar(post) {
  const { auth } = useAuth();
  const { state } = useProfile();
  const user = state?.user ?? auth?.user;


  let avatarUrl;


  if (post) {
    if (post?.author?.id === state?.user?.id) {
      avatarUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`;
    }

    if (post?.author?.id !== state?.user?.id) {
      avatarUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/${post?.author?.avatar}`;
    }
  }

  if (!post) {
    avatarUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`;
  }

  return { avatarUrl };
}
