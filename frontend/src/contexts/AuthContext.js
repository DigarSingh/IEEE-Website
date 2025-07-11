import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state on load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get stored token and user data
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          
          // Optionally verify token with backend
          // const response = await fetch('http://localhost:5000/api/auth/verify', {
          //   headers: { Authorization: `Bearer ${token}` }
          // });
          // if (!response.ok) throw new Error('Invalid token');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      console.log(`Using API URL: ${apiUrl}`);
      
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      // Log response status for debugging
      console.log(`Login response status: ${response.status}`);
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Login error response:', data);
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }
      
      console.log('Login successful, storing user data');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  // Check if user is admin
  // Temporarily modify the isAdmin function to grant admin access for testing
  const isAdmin = () => {
    // For testing: make a specific email always have admin access
    // This is temporary - you should implement proper role-based checks later
    return user && (user.role === 'admin' || user.email === 'your-email@example.com');
  };

  // Register function
  const register = async (userData) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      console.log(`Using API URL for registration: ${apiUrl}`);
      console.log('Registering with data:', {
        ...userData,
        password: '[MASKED]',
        confirmPassword: '[MASKED]'
      });
      
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include' // Include cookies if your API uses them
      });
      
      // Log response status for debugging
      console.log(`Registration response status: ${response.status}`);
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Registration error response:', data);
        throw new Error(data.message || 'Registration failed');
      }
      
      console.log('Registration successful, storing user data');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// HOC to protect admin routes
export const withAdminAuth = (Component) => {
  const WithAdminAuth = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      if (!loading && (!user || user.role !== 'admin')) {
        router.replace('/login');
      }
    }, [loading, user, router]);
    
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      );
    }
    
    if (!user || user.role !== 'admin') {
      return null;
    }
    
    return <Component {...props} />;
  };
  
  return WithAdminAuth;
};
