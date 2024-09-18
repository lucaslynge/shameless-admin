// components/AuthGuard.js
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // If the user is authenticated, render the children components
  if (!isAuthenticated) {
    return null; // or a loading spinner while checking auth status
  }

  return <>{children}</>;
};

export default AuthGuard;
