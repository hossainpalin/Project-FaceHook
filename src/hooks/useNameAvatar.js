import { getInitialAvatar, getRandomBgColor } from '../utils/getInitialAvatar';
import useAuth from './useAuth';
import useProfile from './useProfile';

const color = getRandomBgColor();

export default function useNameAvatar() {
  const { auth } = useAuth();
  const { state } = useProfile();
  const user = state?.user ?? auth?.user;
  const name = `${user?.firstName}, ${user?.lastName}`;
  const nameAvatar = getInitialAvatar(name, color);

  return nameAvatar;
}
