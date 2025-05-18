import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaUniversity, FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    studentId: '',
    college: '',
    branch: '',
    year: '',
    bio: ''
  });
  const [avatar, setAvatar] = useState('/images/default-avatar.png');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // Fetch user data from the server
        const response = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUser(userData);
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          mobile: userData.mobile || '',
          studentId: userData.studentId || '',
          college: userData.college || '',
          branch: userData.branch || 'Computer Science',
          year: userData.year || '2nd Year',
          bio: userData.bio || 'IEEE member passionate about technology and innovation.'
        });
        setAvatar(userData.avatar || '/images/default-avatar.png');
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Fallback to local storage if API fails
        try {
          const userData = JSON.parse(localStorage.getItem('user'));
          if (userData) {
            setUser(userData);
            setFormData({
              name: userData.name || '',
              email: userData.email || '',
              mobile: userData.mobile || '',
              studentId: userData.studentId || '',
              college: userData.college || '',
              branch: userData.branch || 'Computer Science',
              year: userData.year || '2nd Year',
              bio: userData.bio || 'IEEE member passionate about technology and innovation.'
            });
            setAvatar(userData.avatar || '/images/default-avatar.png');
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async (token) => {
    if (!avatarFile) return null;

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      const response = await fetch('/api/users/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload avatar');
      }

      const data = await response.json();
      return data.avatarUrl; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Upload avatar if a new one is selected
      let avatarUrl = null;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(token);
      }

      // Update user profile data
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          avatar: avatarUrl // Include the new avatar URL if available
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Get updated user data
      const updatedUserData = await response.json();

      // Update local state and localStorage as a fallback
      const updatedUser = { 
        ...user, 
        ...formData,
        avatar: avatarUrl || user.avatar
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      if (avatarUrl) {
        setAvatar(avatarUrl);
      }
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setAvatarFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    // Reset form data to current user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        studentId: user.studentId || '',
        college: user.college || '',
        branch: user.branch || 'Computer Science',
        year: user.year || '2nd Year',
        bio: user.bio || 'IEEE member passionate about technology and innovation.'
      });
    }
    setPreviewUrl(null);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>My Profile | IEEE GEU</title>
      </Head>

      <div className="py-12 bg-[#080D14] min-h-screen">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <h1 className="mb-2 text-3xl font-bold text-white">My Profile</h1>
              <p className="text-gray-400">Manage your personal information and IEEE membership details</p>
            </div>

            {/* Profile Card - Modified to be simpler */}
            <div className="overflow-hidden bg-[#101926]/70 backdrop-blur-lg rounded-2xl border border-gray-800 shadow-xl">
              
              {/* Simple header with edit button */}
              <div className="relative p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={previewUrl || avatar}
                        alt="Profile"
                        className="object-cover w-16 h-16 border-2 border-blue-500 rounded-full"
                      />
                      {isEditing && (
                        <div className="absolute bottom-0 right-0">
                          <label htmlFor="avatar-upload" className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700">
                            <FaPen size={12} />
                          </label>
                          <input 
                            id="avatar-upload" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleAvatarChange}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                      <p className="text-sm text-blue-400">{user?.email}</p>
                    </div>
                  </div>
                  
                  {!isEditing ? (
                    <motion.button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPen className="mr-1" size={12} />
                      Edit Profile
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={cancelEdit}
                      className="flex items-center px-3 py-1 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTimes className="mr-1" size={12} />
                      Cancel
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Profile info */}
              <div className="p-8">
                {error && (
                  <div className="p-4 mb-6 text-sm text-red-400 rounded-lg bg-red-900/30">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-4 mb-6 text-sm text-green-400 rounded-lg bg-green-900/30">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6 mb-8 md:grid-cols-2">
                    {/* Personal Information Section */}
                    <div className="col-span-2">
                      <h3 className="mb-4 text-xl font-semibold text-white">Personal Information</h3>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaUser className="text-blue-400" />
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white"
                          />
                        ) : (
                          <div className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 bg-gray-900/20 rounded-lg text-white">
                            {formData.name}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaEnvelope className="text-blue-400" />
                        </div>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white"
                          />
                        ) : (
                          <div className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 bg-gray-900/20 rounded-lg text-white">
                            {formData.email}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300">Mobile Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaPhone className="text-blue-400" />
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white"
                          />
                        ) : (
                          <div className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 bg-gray-900/20 rounded-lg text-white">
                            {formData.mobile}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300">Student ID</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaIdCard className="text-blue-400" />
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white"
                          />
                        ) : (
                          <div className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 bg-gray-900/20 rounded-lg text-white">
                            {formData.studentId}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Academic Information Section */}
                    <div className="col-span-2 mt-4">
                      <h3 className="mb-4 text-xl font-semibold text-white">Academic Information</h3>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300">College / University</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaUniversity className="text-blue-400" />
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            name="college"
                            value={formData.college}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white"
                          />
                        ) : (
                          <div className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 bg-gray-900/20 rounded-lg text-white">
                            {formData.college}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300">Branch / Major</label>
                      <div className="relative">
                        {isEditing ? (
                          <select
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            className="block w-full px-3 py-2.5 border border-gray-700 bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white"
                          >
                            <option value="Computer Science">Computer Science</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Civil">Civil</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          <div className="block w-full px-3 py-2.5 border border-gray-700 bg-gray-900/20 rounded-lg text-white">
                            {formData.branch}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-300">Year of Study</label>
                      <div className="relative">
                        {isEditing ? (
                          <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="block w-full px-3 py-2.5 border border-gray-700 bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white"
                          >
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            <option value="Graduate">Graduate</option>
                          </select>
                        ) : (
                          <div className="block w-full px-3 py-2.5 border border-gray-700 bg-gray-900/20 rounded-lg text-white">
                            {formData.year}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-300">Bio</label>
                      <div className="relative">
                        {isEditing ? (
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className="block w-full px-3 py-2.5 border border-gray-700 bg-gray-900/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-white"
                          />
                        ) : (
                          <div className="block w-full px-3 py-2.5 border border-gray-700 bg-gray-900/20 rounded-lg text-white min-h-[100px]">
                            {formData.bio}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end">
                      <motion.button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isSaving ? (
                          <>
                            <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaCheck className="mr-2" />
                            Save Changes
                          </>
                        )}
                      </motion.button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
