import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/slices/authSlice';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Only attempt to restore session if a token actually exists
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getMe());
      // getMe.rejected already clears the bad token from localStorage
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <AppRoutes />;
};

export default App;