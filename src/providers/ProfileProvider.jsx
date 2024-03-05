import { useReducer } from 'react';
import { ProfileContext } from '../context';
import ProfileReducer, { initialState } from '../reducers/profileReducer';

export default function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}
