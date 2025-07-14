import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      // Get stored token from both localStorage and cookies for compatibility
      const storedToken = localStorage.getItem('token') || Cookies.get('token');
      if (storedToken) {
        try {
          // Get stored user data
          const userData = localStorage.getItem('user');
          const parsedUser = userData ? JSON.parse(userData) : null;
          
          if (parsedUser) {
            // Set initial user state from localStorage
            setUser(parsedUser);
            setIsAuthenticated(true);
          }
          
          // Verify token with backend
          const response = await axios.get('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          
          if (response.data.success) {
            // Update user data with latest from server
            setUser(response.data.user);
            setIsAuthenticated(true);
            // Update local storage
            localStorage.setItem('user', JSON.stringify(response.data.user));
          } else {
            // If token is invalid, clear everything
            Cookies.remove('token');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Auth verification error:', error);
          // Clear auth data on error
          Cookies.remove('token');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      console.log(`Attempting login for: ${email}`);
      
      // Special case for admin test credentials
      if (email === 'admin@ieee.org' && password === 'admin123') {
        console.log('Using admin test credentials');
        // Create admin user object
        const adminUser = {
          id: 'admin-test-id',
          name: 'Admin User',
          email: 'admin@ieee.org',
          role: 'admin'
        };
        
        // Store admin info in localStorage and cookies
        const adminToken = 'admin-test-token';
        localStorage.setItem('token', adminToken);
        localStorage.setItem('user', JSON.stringify(adminUser));
        Cookies.set('token', adminToken, { expires: 7 });
        
        setUser(adminUser);
        setIsAuthenticated(true);
        
        return { 
          success: true,
          user: adminUser
        };
      }
      
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Save token in both cookies and localStorage for compatibility
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
      
      setUser(user);
      setIsAuthenticated(true);
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      // Remove confirmPassword if it exists since it's not needed on the server
      const { confirmPassword, ...dataToSend } = userData;
      
      const response = await axios.post('/api/auth/register', dataToSend);
      const { token, user } = response.data;
      
      // Save token in both cookies and localStorage for compatibility
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      Cookies.set('token', token, { expires: 7 });
      
      setUser(user);
      setIsAuthenticated(true);
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = async () => {
    try {
      // Call logout API to clear cookies on server-side
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear storage regardless of API success
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Cookies.remove('token');
      setUser(null);
      setIsAuthenticated(false);
      router.push('/');
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return user && (user.role === 'admin' || user.role === 'superadmin');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      loading,
      isAdmin,
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
