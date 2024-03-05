import { useReducer } from 'react';
import { PostContext } from '../context';
import postReducer, { initialState } from '../reducers/postReducer';

export default function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}
