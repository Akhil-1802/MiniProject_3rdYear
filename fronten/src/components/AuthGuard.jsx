import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const AuthGuard = ({ children, requireAuth = true }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (requireAuth && !currentUser) {
        navigate('/signin');
      } else if (!requireAuth && currentUser) {
        // Check user verification and basic info status
        try {
          const response = await fetch(`http://localhost:3000/api/user/getuser/${currentUser.uid}`);
          if (response.ok) {
            const data = await response.json();
            if (!data.user.isVerified) {
              navigate('/verify-email');
            } else if (data.user.hasCompletedBasicInfo) {
              navigate('/dashboard');
            } else {
              navigate('/basic-information');
            }
          }
        } catch (error) {
          console.error('Error checking user data:', error);
        }
      }
      setLoading(false);
    });
    
    return unsubscribe;
  }, [navigate, requireAuth]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return children;
};

export default AuthGuard;