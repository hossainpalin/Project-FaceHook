import { useEffect, useState } from 'react';
import { AuthContext } from '../context';

export default function AuthProvider({ children }) {
  const localAuthToken = localStorage.getItem('authToken');
  const initialAuthToken = localAuthToken ? JSON.parse(localAuthToken) : {};
  const [auth, setAuth] = useState(initialAuthToken);

  useEffect(() => {
    if (auth.authToken) {
      localStorage.setItem('authToken', JSON.stringify(auth));
    } else {
      localStorage.removeItem('authToken');
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
