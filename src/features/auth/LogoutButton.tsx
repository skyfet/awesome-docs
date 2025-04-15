import { logout } from './authSlice'; 

import LogoutIcon from '@mui/icons-material/Logout';

import { IconButton } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <IconButton aria-label='logout' onClick={handleLogout}>
    <LogoutIcon/>
  </IconButton>;
};

export default LogoutButton;