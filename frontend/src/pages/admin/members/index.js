import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  FaUserPlus, 
  FaUserEdit, 
  FaTrash, 
  FaDownload, 
  FaSearch, 
  FaFileExcel, 
  FaFileCsv
} from 'react-icons/fa';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useAuth } from '../../../context/AuthContext';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/login?redirect=admin/members');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (token) {
        try {
          setIsLoading(true);
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/members`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await response.json();
          
          if (data.success) {
            setMembers(data.members);
            setFilteredMembers(data.members);
          }
        } catch (error) {
          console.error('Error fetching members:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMembers();
  }, [token]);

  useEffect(() => {
    // Filter members based on search and status
    const results = members.filter(member => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.ieeeId && member.ieeeId.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (filterStatus === 'all') {
        return matchesSearch;
      } else if (filterStatus === 'verified') {
        return matchesSearch && member.isVerified;
      } else {
        return matchesSearch && !member.isVerified;
      }
    });

    setFilteredMembers(results);
  }, [searchTerm, filterStatus, members]);

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!memberToDelete) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/members/${memberToDelete._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        // Remove member from state
        setMembers(prevMembers => 
          prevMembers.filter(member => member._id !== memberToDelete._id)
        );
        setShowDeleteModal(false);
        setMemberToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleExport = (format) => {
    if (token) {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/members/export/${format}?token=${token}`;
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col items-start justify-between mb-6 md:flex-row md:items-center">
          <h1 className="mb-4 text-3xl font-bold md:mb-0">Members Management</h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex space-x-2">
              <button 
                onClick={() => handleExport('excel')}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                <FaFileExcel className="mr-2" /> Export Excel
              </button>
              <button 
                onClick={() => handleExport('csv')}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <FaFileCsv className="mr-2" /> Export CSV
              </button>
              <button
                onClick={() => router.push('/admin/members/add')}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-ieee-blue rounded-lg hover:bg-ieee-dark"
              >
                <FaUserPlus className="mr-2" /> Add Member
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
            <div className="relative mb-4 md:mb-0">
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or IEEE ID..."
                className="w-full px-10 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
              >
                <option value="all">All Members</option>
                <option value="verified">Verified Only</option>
                <option value="unverified">Unverified Only</option>
              </select>
            </div>
          </div>
          
          {filteredMembers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-gray-50">
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">IEEE ID</th>
                    <th className="px-4 py-3 font-semibold">Branch</th>
                    <th className="px-4 py-3 font-semibold">Year</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <img
                            src={member.profilePhoto || '/images/default-profile.jpg'}
                            alt={member.name}
                            className="w-8 h-8 mr-3 rounded-full"
                          />
                          {member.name}
                        </div>
                      </td>
                      <td className="px-4 py-3">{member.email}</td>
                      <td className="px-4 py-3">{member.ieeeId || '-'}</td>
                      <td className="px-4 py-3">{member.branch}</td>
                      <td className="px-4 py-3">{member.year}</td>
                      <td className="px-4 py-3">
                        <span 
                          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                            member.isVerified 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {member.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => router.push(`/admin/members/edit/${member._id}`)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="Edit Member"
                          >
                            <FaUserEdit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(member)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Delete Member"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-gray-500">No members found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
            <h3 className="mb-4 text-xl font-bold">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete <span className="font-semibold">{memberToDelete?.name}</span>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default MembersPage;
