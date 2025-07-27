
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminIndexPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (!isAdmin()) {
      router.push('/login');
      return;
    }
    
    // Redirect to admin dashboard
    router.push('/admin/dashboard');
  }, [isAuthenticated, isAdmin, router]);
  
  return null;
}

// Skip static generation for this page
export const getStaticProps = () => {
  return { props: {} };
}
