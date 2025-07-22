
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminIndexPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is authenticated and is admin
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === 'admin') {
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
      } else {
        // Not an admin, redirect to login
        router.push('/login');
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push('/login');
    }
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080D14]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Redirecting to admin dashboard...</p>
      </div>
    </div>
  );
}

// Skip static generation for this page
export const getStaticProps = () => {
  return { props: {} };
};
