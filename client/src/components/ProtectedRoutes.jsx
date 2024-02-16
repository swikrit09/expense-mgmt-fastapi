import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoutes = () => {

  const states=useUser();

  return states.user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes