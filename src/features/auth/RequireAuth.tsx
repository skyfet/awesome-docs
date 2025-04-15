import { useAppSelector } from '../../app/hooks';
import { Navigate } from 'react-router-dom';
import { selectIsAuthorized } from './authSlice';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authorized = useAppSelector(selectIsAuthorized);
  
  if (!authorized) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default RequireAuth;