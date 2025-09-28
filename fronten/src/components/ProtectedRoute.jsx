import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, userData } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/signin" />;
  }
  
  if (userData && !userData.isVerified) {
    return <Navigate to="/verify-email" />;
  }
  
  return children;
};

export default ProtectedRoute;