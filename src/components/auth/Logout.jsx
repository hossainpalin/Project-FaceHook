import { useNavigate } from 'react-router-dom';
import LogoutIcon from '../../assets/icons/logout.svg';
import useAuth from '../../hooks/useAuth';

export default function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({});
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="icon-btn">
      <img src={LogoutIcon} alt="logout-icon" />
    </button>
  );
}
