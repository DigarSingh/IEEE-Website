import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.replace('/login');
      } else if (user) {
        // Redirect based on user role
        if (user.role === 'admin' || user.role === 'superadmin') {
          router.replace('/admin/dashboard');
        } else if (user.role === 'student') {
          router.replace('/student/dashboard');
        } else {
          // Default route for unknown roles
          router.replace('/');
        }
      }
    }
  }, [user, isAuthenticated, loading, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <FaSpinner className="w-12 h-12 text-blue-600 animate-spin" />
      <p className="mt-4 text-lg text-gray-600">Redirecting to your dashboard...</p>
    </div>
  );
}
