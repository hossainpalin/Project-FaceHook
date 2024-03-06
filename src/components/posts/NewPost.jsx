import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAvatar from '../../hooks/useAvatar';
import useNameAvatar from '../../hooks/useNameAvatar';
import useProfile from '../../hooks/useProfile';
import PostEntry from './PostEntry';

export default function NewPost() {
  const [showPostEntry, setShowPostEntry] = useState(false);
  const { avatarUrl } = useAvatar();
  const { state } = useProfile();
  const { auth } = useAuth();
  const user = state?.user ?? auth?.user;
  const nameAvatar = useNameAvatar();

  return (
    <>
      {showPostEntry ? (
        <PostEntry onCreate={() => setShowPostEntry(false)} />
      ) : (
        <div className="card">
          <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={user?.avatar === null ? nameAvatar : avatarUrl}
              alt="avatar"
            />

            <div className="flex-1">
              <textarea
                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                name="post"
                id="post"
                placeholder="What's on your mind?"
                onClick={() => setShowPostEntry(true)}></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
