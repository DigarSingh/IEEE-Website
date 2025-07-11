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
        } catch (error) {
          console.error('Error verifying token:', error);
          Cookies.remove('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      console.log(`Using API URL for login: ${apiUrl}`);
      
      const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      const { token: authToken, user: userData } = response.data;
      
      if (!authToken || !userData) {
        throw new Error('Invalid response from server');
      }
      
      // Save token in cookies
      Cookies.set('token', authToken, { expires: 7 }); // Expires in 7 days
      
      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
      return { 
        success: false, 
        message: err.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      console.log(`Using API URL for registration: ${apiUrl}`);
      
      // Log the registration data without sensitive information
      const sanitizedData = { ...userData };
      if (sanitizedData.password) sanitizedData.password = '[MASKED]';
      if (sanitizedData.confirmPassword) sanitizedData.confirmPassword = '[MASKED]';
      console.log('Registering with data:', sanitizedData);
      
      // Send registration request
      const response = await axios.post(`${apiUrl}/api/auth/register`, userData);
      
      // Check if we got the expected data structure
      const { token: authToken, user: newUser } = response.data;
      
      if (!authToken || !newUser) {
        throw new Error('Invalid response from server');
      }
      
      // Save token in cookies
      Cookies.set('token', authToken, { expires: 7 }); // Expires in 7 days
      
      // Update state
      setToken(authToken);
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      
      return { 
        success: false, 
        message: errorMessage
      };
    }
  };

  const logout = () => {
    // Remove token from cookies
    Cookies.remove('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      isAuthenticated, 
      login, 
      register, 
      logout,
      isLoading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Add isAdmin helper function
  const isAdmin = () => {
    return context.user && context.user.role === 'admin';
  };
  
  return {
    ...context,
    isAdmin
  };
};
