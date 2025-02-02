import React, { useEffect, useState } from 'react';
import { FaCamera, FaLock, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BaseUrl, patch } from '../services/Endpoint';
import { setUser } from '../redux/AuthSlice';

export default function Profile() {
  const { userId } = useParams(); 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Load existing user data
  useEffect(() => {
    if (user) {
      setName(user.FullName || '');
    }
  }, [user]);

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('FullName', name);
    formData.append('oldpassword', oldPassword);
    formData.append('newpassword', newPassword);
    if (profileImage) {
      formData.append('profile', profileImage);
    }

    try {
      const response = await patch(`auth/profile/${userId}`, formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.user));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='profile-container'>
      <h1 className='profile-title'>Update Profile</h1>
      <form className='profile-form' onSubmit={handleUpdateProfile}>
        {/* Profile Image Section */}
        <div className='profile-image-section'>
          <label htmlFor='profileImage' className='profile-image-label'>
            {previewImage ? (
              <img src={previewImage} alt='Avatar' className='profile-image' />
            ) : user?.profile ? (
              <img src={`${BaseUrl}/images/${user.profile}`} alt='Avatar' className='profile-image' />
            ) : (
              <div className='profile-placeholder'>
                <FaUser className='profile-icon' />
              </div>
            )}
            <FaCamera className='profile-camera-icon' />
          </label>
          <input
            type='file'
            id='profileImage'
            accept='image/*'
            onChange={handleImageChange}
            className='profile-image-input'
          />
        </div>

        {/* Name Input */}
        <div className='input-group'>
          <FaUser className='input-icon' />
          <input
            type='text'
            placeholder='Update Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='profile-input'
          />
        </div>

        {/* Old Password */}
        <div className='input-group'>
          <FaLock className='input-icon' />
          <input
            type='password'
            placeholder='Old Password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className='profile-input'
          />
        </div>

        {/* New Password */}
        <div className='input-group'>
          <FaLock className='input-icon' />
          <input
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='profile-input'
          />
        </div>

        {/* Submit Button */}
        <button type='submit' className='profile-button'>Update Profile</button>
      </form>
    </div>
  );
}
