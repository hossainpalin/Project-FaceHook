import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '../../assets/icons/home.svg';
import NotificationIcon from '../../assets/icons/notification.svg';
import LWSLogo from '../../assets/images/logo.svg';
import useAuth from '../../hooks/useAuth';
import useAvatar from '../../hooks/useAvatar';
import useNameAvatar from '../../hooks/useNameAvatar';
import useProfile from '../../hooks/useProfile';
import Logout from '../auth/Logout';

export default function Header() {
  const { auth } = useAuth();
  const { state } = useProfile();
  const user = state?.user ?? auth?.user;
  const { avatarUrl } = useAvatar();
  const nameAvatar = useNameAvatar();

  // Navigate to profile page
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/">
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src={LWSLogo}
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={HomeIcon} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={NotificationIcon} alt="Notification" />
          </button>
          <Logout />
          <button
            onClick={() => navigate('/me')}
            className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">
              {user?.firstName} {user?.lastName}
            </span>
            <div className="h-[32px] w-[32px] lg:h-[44px] lg:w-[44px] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={user?.avatar === null ? nameAvatar : avatarUrl}
                alt="avatar"
              />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
