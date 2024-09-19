// context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for token on app load
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
    setLoading(false);
  }, [router]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook for accessing auth context
export function useAuth() {
  return useContext(AuthContext);
}
