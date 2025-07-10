import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      const storedToken = Cookies.get('token');
      if (storedToken) {
        setToken(storedToken);
        try {
          // Verify token with backend
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          
          const data = await response.json();
          
          if (data.success) {
            setUser(data.user);
            setIsAuthenticated(true);
          } else {
            // If token is invalid, clear it
            Cookies.remove('token');
            setToken(null);
            setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Save token in cookies
      Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
      
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { token, user } = response.data;
      
      // Save token in cookies
      Cookies.set('token', token, { expires: 7 });
      
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    // Remove token from cookies
    Cookies.remove('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
