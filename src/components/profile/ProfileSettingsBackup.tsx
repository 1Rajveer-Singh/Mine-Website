import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaEdit, 
  FaCamera, FaEye, FaEyeSlash, FaKey, FaGlobe, FaCalendar,
  FaBriefcase, FaGraduationCap, FaLinkedin, FaTwitter, FaGithub,
  FaUserTag, FaShieldAlt, FaCheck, FaTimes, FaUpload, FaSpinner,
  FaPlus, FaTrash, FaCog, FaLock, FaBell, FaUserCircle,
  FaStar, FaGamepad, FaTrophy, FaRocket, FaFire, FaBolt, FaMagic,
  FaAtom, FaCircle, FaHeart
} from 'react-icons/fa';

interface UserProfile {
  // Basic Information
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  
  // Professional Information
  jobTitle: string;
  company: string;
  experience: string;
  education: string;
  skills: string[];
  
  // Location Information
  address: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  
  // Social Links
  linkedin: string;
  twitter: string;
  github: string;
  website: string;
  
  // Privacy Settings
  profileVisibility: 'public' | 'private' | 'connections';
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  
  // Security
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
}

const ProfileSettings: React.FC = () => {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<UserProfile>({
    // Basic Information
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe_mining',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Senior Mining Engineer with 10+ years of experience in blast design, tunnel construction, and mineral exploration. Passionate about sustainable mining practices and innovative technologies in the mining industry.',
    avatar: '/assets/imageperson1.jpg',
    
    // Professional Information
    jobTitle: 'Senior Mining Engineer',
    company: 'Mining Solutions Inc.',
    experience: '10+ years',
    education: 'M.S. Mining Engineering, Colorado School of Mines',
    skills: ['Blast Design', 'Tunnel Construction', 'Mineral Exploration', 'AutoCAD', 'GIS', 'Project Management'],
    
    // Location Information
    address: '123 Mining Avenue',
    city: 'Denver',
    state: 'Colorado',
    country: 'United States',
    timezone: 'America/Denver',
    
    // Social Links
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: '',
    github: '',
    website: '',
    
    // Privacy Settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    
    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'professional' | 'privacy' | 'security'>('personal');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Checkout preferences state
  const [checkoutPreferences, setCheckoutPreferences] = useState({
    expressCheckout: true,
    autoFillBillingAddress: true,
    savePaymentMethods: true,
    defaultPaymentMethod: 'credit',
    currency: 'USD',
    emailReceipts: true,
    smsNotifications: false,
    autoApplyCoupons: true,
    taxExempt: false,
    guestCheckoutAllowed: false
  });

  // Load profile data on component mount
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = () => {
    // Load from localStorage or API
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(prev => ({ ...prev, ...parsedProfile }));
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }
  };

  const updateGlobalProfile = (updatedProfile: UserProfile) => {
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    
    // Dispatch event for other components to listen
    window.dispatchEvent(new CustomEvent('profileUpdated', { 
      detail: {
        name: `${updatedProfile.firstName} ${updatedProfile.lastName}`,
        avatar: updatedProfile.avatar,
        email: updatedProfile.email,
        role: updatedProfile.jobTitle || 'User'
      }
    }));
  };

  const handleInputChange = (field: keyof UserProfile, value: string | boolean | string[]) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        setProfile(prev => ({
          ...prev,
          avatar: result
        }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update global profile
      updateGlobalProfile(profile);
      
      setIsEditing(false);
      setAvatarPreview(null);
      
      // Show success notification
      showNotification('Profile updated successfully! Changes will reflect across the site.', 'success');
    } catch (error) {
      showNotification('Error updating profile. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (profile.newPassword !== profile.confirmPassword) {
      showNotification('New passwords do not match!', 'error');
      return;
    }
    if (profile.newPassword.length < 8) {
      showNotification('Password must be at least 8 characters long!', 'error');
      return;
    }
    
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear password fields
      setProfile(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      showNotification('Password changed successfully!', 'success');
    } catch (error) {
      showNotification('Error changing password. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Gaming Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-30"
           style={{
             backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }}>
      </div>

      {/* Header Section */}
      <div className="relative z-10 bg-gradient-to-r from-slate-800/80 via-gray-800/80 to-slate-800/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-end space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Profile Picture with Gaming Effects */}
            <div className="relative group">
              {/* Glowing Ring Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1 animate-spin-slow">
                <div className="bg-slate-900 rounded-full p-2">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-2xl bg-slate-800">
                    {isUploading ? (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                        <FaSpinner className="animate-spin text-white text-2xl" />
                      </div>
                    ) : (
                      <img
                        src={avatarPreview || profile.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover filter brightness-110 contrast-110"
                      />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Upload Button with Gaming Style */}
              {isEditing && (
                <label className="absolute bottom-3 right-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-cyan-500/50 border border-cyan-400/50">
                  <FaCamera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
              
              {/* Status Indicator with Pulse */}
              <div className="absolute -bottom-2 -right-2 flex items-center space-x-1">
                <div className="relative">
                  <div className="w-6 h-6 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>

              {/* Level Badge */}
              <div className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-2 py-1 rounded-full text-xs font-bold border border-yellow-300">
                <FaTrophy className="inline mr-1" />
                LVL 85
              </div>
            </div>
            
            {/* Profile Info with Gaming Typography */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-2">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {profile.firstName} {profile.lastName}
                </h1>
                <div className="flex space-x-1">
                  <FaStar className="text-yellow-400 animate-pulse" />
                  <FaStar className="text-yellow-400 animate-pulse delay-100" />
                  <FaStar className="text-yellow-400 animate-pulse delay-200" />
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3">
                <FaGamepad className="text-cyan-400" />
                <p className="text-xl text-gray-300 font-medium">@{profile.username}</p>
                <div className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full border border-purple-400/30">
                  <span className="text-sm text-purple-300 font-semibold">{profile.jobTitle}</span>
                </div>
              </div>
              
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                {profile.bio}
              </p>
              
              {/* Stats Bar */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">156</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">89%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Success</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">2.4K</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">XP</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isEditing 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white'
                } hover:scale-105 hover:shadow-xl border border-cyan-400/30`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  {isEditing ? <FaTimes size={16} /> : <FaEdit size={16} />}
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </div>
              </button>
              
              {isEditing && (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="group relative px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl border border-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    {isSaving ? <FaSpinner className="animate-spin" size={16} /> : <FaSave size={16} />}
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gaming Navigation Tabs */}
        <div className="mb-8 relative">
          {/* Gaming Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-xl blur-sm"></div>
          
          <div className="relative flex flex-wrap justify-center md:justify-start space-x-1 bg-gray-900/80 backdrop-blur-lg rounded-xl p-3 shadow-2xl shadow-cyan-500/10 border border-cyan-500/20">
            {[
              { id: 'personal', label: 'Personal Info', icon: FaUser, color: 'cyan' },
              { id: 'professional', label: 'Professional', icon: FaBriefcase, color: 'purple' },
              { id: 'privacy', label: 'Privacy', icon: FaShieldAlt, color: 'pink' },
              { id: 'security', label: 'Security', icon: FaLock, color: 'emerald' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group relative flex items-center space-x-3 px-6 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r from-${tab.color}-600/30 via-${tab.color}-500/20 to-${tab.color}-600/30 text-${tab.color}-300 shadow-lg shadow-${tab.color}-500/30 border border-${tab.color}-500/40 ring-2 ring-${tab.color}-500/20`
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/60 hover:border-gray-600/50 border border-gray-700/30'
                }`}
              >
                <tab.icon className={`${activeTab === tab.id ? 'animate-pulse' : 'group-hover:rotate-12'} transition-transform duration-300`} size={20} />
                <span className="hidden sm:inline font-semibold tracking-wide">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse rounded-lg"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content with Gaming Design */}
        <div className="space-y-8 relative">
          {/* Gaming Background Effects */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>

          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Basic Information Card */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group">
                  {/* Gaming Header */}
                  <div className="flex items-center mb-8 relative">
                    <div className="absolute -left-2 top-0 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></div>
                    <FaUser className="mr-4 text-cyan-400 text-2xl animate-pulse" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                      Basic Information
                    </h3>
                    <div className="ml-auto">
                      <FaBolt className="text-yellow-400 animate-bounce" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group/field">
                      <label className="block text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wide">
                        <FaAtom className="inline mr-2 text-cyan-400" />
                        First Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={profile.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-6 py-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/70 disabled:bg-gray-800/30 disabled:text-gray-400 text-white font-medium placeholder-gray-500 transition-all duration-300 hover:border-cyan-500/30"
                          placeholder="Enter first name"
                        />
                        {isEditing && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <FaEdit className="text-cyan-400 opacity-50" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="group/field">
                      <label className="block text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wide">
                        <FaCircle className="inline mr-2 text-purple-400" />
                        Last Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={profile.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-6 py-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/70 disabled:bg-gray-800/30 disabled:text-gray-400 text-white font-medium placeholder-gray-500 transition-all duration-300 hover:border-purple-500/30"
                          placeholder="Enter last name"
                        />
                        {isEditing && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <FaEdit className="text-purple-400 opacity-50" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="group/field">
                      <label className="block text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wide">
                        <FaGamepad className="inline mr-2 text-pink-400" />
                        Username *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={profile.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-6 py-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/70 disabled:bg-gray-800/30 disabled:text-gray-400 text-white font-medium placeholder-gray-500 transition-all duration-300 hover:border-pink-500/30"
                          placeholder="Enter username"
                        />
                        {isEditing && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <FaEdit className="text-pink-400 opacity-50" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="group/field">
                      <label className="block text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wide">
                        <FaEnvelope className="inline mr-2 text-emerald-400" />
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-6 py-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/70 disabled:bg-gray-800/30 disabled:text-gray-400 text-white font-medium placeholder-gray-500 transition-all duration-300 hover:border-emerald-500/30"
                          placeholder="Enter email address"
                        />
                        {isEditing && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <FaEdit className="text-emerald-400 opacity-50" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 group/field">
                      <label className="block text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wide">
                        <FaHeart className="inline mr-2 text-red-400 animate-pulse" />
                        Bio / Description
                      </label>
                      <div className="relative">
                        <textarea
                          value={profile.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          disabled={!isEditing}
                          rows={4}
                          className="w-full px-6 py-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/70 disabled:bg-gray-800/30 disabled:text-gray-400 text-white font-medium placeholder-gray-500 transition-all duration-300 hover:border-red-500/30 resize-none"
                          placeholder="Tell us about yourself..."
                        />
                        {isEditing && (
                          <div className="absolute right-4 top-4">
                            <FaEdit className="text-red-400 opacity-50" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information Card */}
                <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                  {/* Gaming Header */}
                  <div className="flex items-center mb-8 relative">
                    <div className="absolute -left-2 top-0 w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full"></div>
                    <FaPhone className="mr-4 text-purple-400 text-2xl animate-pulse" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                      Contact Information
                    </h3>
                    <div className="ml-auto">
                      <FaRocket className="text-yellow-400 animate-bounce" />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="group/field">
                      <label className="block text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wide">
                        <FaPhone className="inline mr-2 text-green-400" />
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-6 py-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/70 disabled:bg-gray-800/30 disabled:text-gray-400 text-white font-medium placeholder-gray-500 transition-all duration-300 hover:border-green-500/30"
                          placeholder="Enter phone number"
                        />
                        {isEditing && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <FaEdit className="text-green-400 opacity-50" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Gaming Sidebar */}
              <div className="space-y-8">
                {/* Achievement Card */}
                <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 group">
                  <div className="flex items-center mb-6 relative">
                    <div className="absolute -left-2 top-0 w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-600 rounded-full"></div>
                    <FaTrophy className="mr-3 text-yellow-400 text-xl animate-pulse" />
                    <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                      Achievements
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="flex items-center space-x-3">
                        <FaStar className="text-yellow-400" />
                        <span className="text-white font-medium">Profile Master</span>
                      </div>
                      <div className="text-yellow-400 text-sm">95%</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="flex items-center space-x-3">
                        <FaFire className="text-purple-400" />
                        <span className="text-white font-medium">Gaming Elite</span>
                      </div>
                      <div className="text-purple-400 text-sm">Level 42</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                      <div className="flex items-center space-x-3">
                        <FaMagic className="text-cyan-400" />
                        <span className="text-white font-medium">Tech Wizard</span>
                      </div>
                      <div className="text-cyan-400 text-sm">Expert</div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Card */}
                <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group">
                  <div className="flex items-center mb-6 relative">
                    <div className="absolute -left-2 top-0 w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></div>
                    <FaBolt className="mr-3 text-cyan-400 text-xl animate-pulse" />
                    <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                      Quick Stats
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-white">
                      <span className="text-gray-300">Profile Completion</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                        </div>
                        <span className="text-green-400 text-sm font-bold">85%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-white">
                      <span className="text-gray-300">Gaming Level</span>
                      <div className="flex items-center space-x-2">
                        <FaGamepad className="text-purple-400" />
                        <span className="text-purple-400 font-bold">Level 42</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-white">
                      <span className="text-gray-300">Experience Points</span>
                      <span className="text-cyan-400 font-bold">2,456 XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <FaGlobe className="mr-3 text-blue-600" />
                    Social Links
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaLinkedin className="mr-2 text-blue-700" />
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        value={profile.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="LinkedIn profile URL"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaTwitter className="mr-2 text-blue-400" />
                        Twitter
                      </label>
                      <input
                        type="url"
                        value={profile.twitter}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Twitter profile URL"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaGithub className="mr-2 text-gray-800" />
                        GitHub
                      </label>
                      <input
                        type="url"
                        value={profile.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="GitHub profile URL"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FaGlobe className="mr-2 text-green-600" />
                        Website
                      </label>
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Personal website URL"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Professional Information Tab */}
          {activeTab === 'professional' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <FaBriefcase className="mr-3 text-blue-600" />
                    Professional Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={profile.jobTitle}
                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Enter job title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={profile.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Enter company name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience
                      </label>
                      <select
                        value={profile.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        <option value="">Select experience</option>
                        <option value="0-1 years">0-1 years</option>
                        <option value="2-5 years">2-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10+ years">10+ years</option>
                        <option value="15+ years">15+ years</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Education
                      </label>
                      <textarea
                        value={profile.education}
                        onChange={(e) => handleInputChange('education', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Enter education details"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <FaGraduationCap className="mr-3 text-blue-600" />
                    Skills & Expertise
                  </h3>
                  
                  {isEditing && (
                    <div className="mb-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Add a skill"
                          onKeyPress={(e) => e.key === 'Enter' && handleSkillAdd()}
                        />
                        <button
                          onClick={handleSkillAdd}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{skill}</span>
                        {isEditing && (
                          <button
                            onClick={() => handleSkillRemove(skill)}
                            className="text-blue-600 hover:text-red-600 transition-colors"
                          >
                            <FaTimes size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {profile.skills.length === 0 && (
                    <p className="text-gray-500 text-center py-8">
                      No skills added yet. {isEditing && 'Add your first skill above!'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Privacy Settings Tab */}
          {activeTab === 'privacy' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FaShieldAlt className="mr-3 text-blue-600" />
                Privacy Settings
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Profile Visibility
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'public', label: 'Public - Anyone can see your profile' },
                      { value: 'connections', label: 'Connections Only - Only your connections can see your profile' },
                      { value: 'private', label: 'Private - Only you can see your profile' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="profileVisibility"
                          value={option.value}
                          checked={profile.profileVisibility === option.value}
                          onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                          disabled={!isEditing}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-800 mb-4">Information Visibility</h4>
                  <div className="space-y-4">
                    {[
                      { key: 'showEmail', label: 'Show email address on profile' },
                      { key: 'showPhone', label: 'Show phone number on profile' },
                      { key: 'showLocation', label: 'Show location on profile' }
                    ].map((setting) => (
                      <label key={setting.key} className="flex items-center justify-between cursor-pointer">
                        <span className="text-gray-700">{setting.label}</span>
                        <input
                          type="checkbox"
                          checked={profile[setting.key as keyof UserProfile] as boolean}
                          onChange={(e) => handleInputChange(setting.key as keyof UserProfile, e.target.checked)}
                          disabled={!isEditing}
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <FaKey className="mr-3 text-blue-600" />
                  Change Password
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.current ? 'text' : 'password'}
                        value={profile.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.new ? 'text' : 'password'}
                        value={profile.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        value={profile.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePasswordChange}
                    disabled={isSaving || !profile.currentPassword || !profile.newPassword || !profile.confirmPassword}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isSaving ? <FaSpinner className="animate-spin" /> : <FaKey />}
                    <span>{isSaving ? 'Updating...' : 'Update Password'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <FaShieldAlt className="mr-3 text-blue-600" />
                  Security Options
                </h3>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="font-medium text-gray-700">Two-Factor Authentication</span>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.twoFactorEnabled}
                      onChange={(e) => handleInputChange('twoFactorEnabled', e.target.checked)}
                      disabled={!isEditing}
                      className="text-blue-600 focus:ring-blue-500 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
