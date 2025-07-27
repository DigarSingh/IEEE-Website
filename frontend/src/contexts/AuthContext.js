
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Create auth context
const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  refreshUser: async () => {}
});

// Mock data for build-time
const MOCK_USER = {
  _id: 'mock-user-id',
  name: 'Mock User',
  email: 'mock@example.com',
  role: 'user',
  profileImage: '/images/testimonials/member1.jpg',
  membershipType: 'student'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to check if we're in build/SSG mode
  const isBuildTime = () => {
    return process.env.NODE_ENV === 'production' && typeof window === 'undefined';
  };

  useEffect(() => {
    // During build/SSG, use mock data instead of real API calls
    if (isBuildTime()) {
      setUser(MOCK_USER);
      setLoading(false);
      return;
    }

    // In runtime, attempt to fetch user data
    async function loadUserFromAPI() {
      try {
        setLoading(true);
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const userData = await res.json();
          setUser(userData.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    
    loadUserFromAPI();
  }, []);

  // Login function
  const login = async (email, password) => {
    // Mock login during build
    if (isBuildTime()) {
      setUser(MOCK_USER);
      return { success: true };
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    // Mock logout during build
    if (isBuildTime()) {
      setUser(null);
      return { success: true };
    }

    try {
      const res = await fetch('/api/auth/logout');
      if (res.ok) {
        setUser(null);
        router.push('/');
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (userData) => {
    // Mock register during build
    if (isBuildTime()) {
      setUser(MOCK_USER);
      return { success: true };
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    // Skip refresh during build
    if (isBuildTime()) return;

    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const userData = await res.json();
        setUser(userData.user);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
