import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaUser, FaSave, FaArrowLeft, FaUpload, FaTrash, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    branch: '',
    year: '',
    mobile: '',
  });
  
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not logged in
    if (!authLoading && !user) {
      router.replace('/login');
      return;
    }
    
    // Populate form with user data
    if (user) {
      setFormData({
        name: user.name || '',
        college: user.college || '',
        branch: user.branch || '',
        year: user.year || '',
        mobile: user.mobile || '',
      });
      
      // Set photo preview if user has a profile photo
      if (user.profilePhoto && user.profilePhoto !== 'default-profile.jpg') {
        const photoUrl = user.profilePhoto.startsWith('http') 
          ? user.profilePhoto 
          : `http://localhost:5000${user.profilePhoto}`;
        setPhotoPreview(photoUrl);
      }
    }
  }, [user, authLoading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({
        ...prev,
        photo: 'File must be an image (JPEG, PNG, etc.)'
      }));
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        photo: 'Image size should be less than 5MB'
      }));
      return;
    }
    
    setProfilePhoto(file);
    setErrors(prev => ({
      ...prev,
      photo: ''
    }));
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const clearPhotoSelection = () => {
    setProfilePhoto(null);
    setPhotoPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.college.trim()) {
      newErrors.college = 'College name is required';
    }
    
    if (!formData.branch.trim()) {
      newErrors.branch = 'Branch is required';
    }
    
    if (!formData.year.trim()) {
      newErrors.year = 'Year of study is required';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccessMessage('');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');
      
      // Create form data to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('college', formData.college);
      formDataToSend.append('branch', formData.branch);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('mobile', formData.mobile);
      
      if (profilePhoto) {
        formDataToSend.append('profilePhoto', profilePhoto);
      }
      
      const response = await fetch(`${apiUrl}/api/members/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }
      
      // Update local storage with the new user data
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = {
        ...userData,
        name: formData.name,
        college: formData.college,
        branch: formData.branch,
        year: formData.year,
        mobile: formData.mobile,
        profilePhoto: data.user.profilePhoto || userData.profilePhoto,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setSuccessMessage('Profile updated successfully!');
      
      // If we have an updated profile picture, use the new URL
      if (data.user.profilePhoto) {
        const photoUrl = data.user.profilePhoto.startsWith('http') 
          ? data.user.profilePhoto 
          : `${apiUrl}${data.user.profilePhoto}`;
        setPhotoPreview(photoUrl);
      }
      
      // Clear file input
      if (profilePhoto) {
        setProfilePhoto(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({
        form: error.message || 'An error occurred while updating your profile.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Edit Profile | IEEE Club</title>
      </Head>

      <div className="container px-6 py-8 mx-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header with back button */}
          <div className="mb-6">
            <button 
              onClick={() => router.back()} 
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
          </div>
          
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-lg font-medium text-gray-900">Edit Profile</h1>
              <p className="mt-1 text-sm text-gray-500">
                Update your personal information and profile photo.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg"
                >
                  {successMessage}
                </motion.div>
              )}
              
              {errors.form && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg"
                >
                  {errors.form}
                </motion.div>
              )}
              
              {/* Profile Photo Upload */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Profile Photo
                </label>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-full">
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Profile Preview" 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <FaUser className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="ml-5">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
                      >
                        <FaUpload className="mr-2" />
                        Upload Photo
                      </button>
                      
                      {photoPreview && (
                        <button
                          type="button"
                          onClick={clearPhotoSelection}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                        >
                          <FaTrash className="mr-2" />
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      JPG, PNG or GIF. Max size 5MB.
                    </p>
                    {errors.photo && (
                      <p className="mt-1 text-sm text-red-600">{errors.photo}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Name */}
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              
              {/* College */}
              <div className="mb-4">
                <label htmlFor="college" className="block mb-2 text-sm font-medium text-gray-700">
                  College
                </label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.college ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.college && (
                  <p className="mt-1 text-sm text-red-600">{errors.college}</p>
                )}
              </div>
              
              {/* Branch */}
              <div className="mb-4">
                <label htmlFor="branch" className="block mb-2 text-sm font-medium text-gray-700">
                  Branch/Department
                </label>
                <input
                  type="text"
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.branch ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.branch && (
                  <p className="mt-1 text-sm text-red-600">{errors.branch}</p>
                )}
              </div>
              
              {/* Year */}
              <div className="mb-4">
                <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-700">
                  Year of Study
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.year ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
                {errors.year && (
                  <p className="mt-1 text-sm text-red-600">{errors.year}</p>
                )}
              </div>
              
              {/* Mobile */}
              <div className="mb-6">
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  className={`block w-full px-3 py-2 border ${
                    errors.mobile ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 mr-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
