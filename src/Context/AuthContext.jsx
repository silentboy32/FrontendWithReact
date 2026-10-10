
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../Store/UserAuth/UserAuth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On app load, ask the backend "who am I?"
  useEffect(() => {
    const checkAuth = async () => {
      try {
        
        const result = await UserProfile();
        setUser(result.data)

      } catch (err) {
       
        if (err.response?.status === 401) {
          setUser(null);
        } else {
          console.error('Auth check failed:', err);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Called after successful login — backend sets the cookie, we store the user
//   const login = (userData) => {
//     setUser(userData);
//   };

//   // Called on logout — backend clears the cookie
//   const logout = async () => {
//     try {
//       await api.post('/api/auth/logout');
//     } catch (err) {
//       console.error('Logout failed:', err);
//     } finally {
//       setUser(null);
//     }
//   };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>');
  }
  return context;
}