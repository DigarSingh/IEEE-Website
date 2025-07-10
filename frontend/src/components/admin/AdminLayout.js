import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaCalendarAlt, 
  FaCertificate, 
  FaEnvelope, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FaTachometerAlt },
    { name: 'Members', href: '/admin/members', icon: FaUsers },
    { name: 'Events', href: '/admin/events', icon: FaCalendarAlt },
    { name: 'Certificates', href: '/admin/certificates', icon: FaCertificate },
    { name: 'Messages', href: '/admin/messages', icon: FaEnvelope }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 py-5 bg-ieee-blue text-white">
            <Link href="/admin/dashboard">
              <span className="flex items-center cursor-pointer">
                <img
                  src="/images/logo.png"
                  alt="IEEE Logo"
                  className="h-8 mr-2"
                />
                <span className="text-lg font-bold">IEEE Admin</span>
              </span>
            </Link>
            <button 
              className="p-1 rounded-full md:hidden focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                      isActive 
                        ? 'bg-blue-100 text-ieee-blue' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-ieee-blue' : 'text-gray-500'}`} />
                    <span className="font-medium">{item.name}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={user?.profilePhoto || '/images/default-profile.jpg'}
                  alt={user?.name || 'Admin'}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <FaSignOutAlt className="w-4 h-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 md:px-6">
          <button
            className="p-1 text-gray-600 rounded-full md:hidden focus:outline-none focus:ring-2 focus:ring-ieee-blue"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 md:hidden">
            IEEE Admin
          </h1>
          <div>
            {/* Additional header content like notifications could go here */}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
