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

// Profile interface
interface Profile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  jobTitle: string;
  company: string;
  avatar: string;
  address: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  linkedin: string;
  twitter: string;
  github: string;
  website: string;
  skills: string[];
  experience: string;
  education: string;
  university: string;
  fieldOfStudy: string;
  graduationYear: string;
  industry: string;
  isPublic: boolean;
  showEmail: boolean;
  showPhone: boolean;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
}

const ProfileSettings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'personal' | 'professional' | 'privacy' | 'security'>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState('');
  
  const [profile, setProfile] = useState<Profile>({
    firstName: 'Alex',
    lastName: 'Johnson',
    username: 'alexj_gamer',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate software developer and gaming enthusiast with a love for creating immersive digital experiences.',
    jobTitle: 'Senior Software Engineer',
    company: 'TechNova Solutions',
    avatar: '/public/assets/imageperson1.jpg',
    address: '123 Tech Street',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    timezone: 'America/Los_Angeles',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    twitter: 'https://twitter.com/alexj_dev',
    github: 'https://github.com/alexjohnson',
    website: 'https://alexjohnson.dev',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'],
    experience: '6-10',
    education: 'Bachelor\'s Degree',
    university: 'Stanford University',
    fieldOfStudy: 'Computer Science',
    graduationYear: '2018',
    industry: 'Software Development',
    isPublic: true,
    showEmail: false,
    showPhone: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  // Global profile update function
  const updateGlobalProfile = (updatedProfile: Profile) => {
    // Update localStorage
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('profileUpdated', { 
      detail: updatedProfile 
    }));
  };

  const handleInputChange = (field: keyof Profile, value: any) => {
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
    notification.style.opacity = '0';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
    }, 100);
    
    // Remove after delay
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
            </div>
            
            {/* Profile Info with Gaming Design */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-2">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                  {profile.firstName} {profile.lastName}
                </h1>
                {/* Level Badge */}
                <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-full border border-yellow-400/50">
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

          {/* Professional Tab */}
          {activeTab === 'professional' && (
            <div className="relative">
              <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="flex items-center mb-8 relative">
                  <div className="absolute -left-2 top-0 w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full"></div>
                  <FaBriefcase className="mr-4 text-purple-400 text-2xl animate-pulse" />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                    Professional Information
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group/field">
                    <label className="block text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wide">
                      <FaTrophy className="inline mr-2 text-yellow-400" />
                      Job Title *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profile.jobTitle}
                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-6 py-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/70 disabled:bg-gray-800/30 disabled:text-gray-400 text-white font-medium placeholder-gray-500 transition-all duration-300 hover:border-yellow-500/30"
                        placeholder="Enter job title"
                      />
                    </div>
                  </div>
                  
                  <div className="group/field">
                    <label className="block text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wide">
                      <FaBolt className="inline mr-2 text-cyan-400" />
                      Company *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profile.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-6 py-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/70 disabled:bg-gray-800/30 disabled:text-gray-400 text-white font-medium placeholder-gray-500 transition-all duration-300 hover:border-cyan-500/30"
                        placeholder="Enter company name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="relative">
              <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                <div className="flex items-center mb-8 relative">
                  <div className="absolute -left-2 top-0 w-1 h-8 bg-gradient-to-b from-pink-400 to-red-600 rounded-full"></div>
                  <FaShieldAlt className="mr-4 text-pink-400 text-2xl animate-pulse" />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-300 via-red-300 to-orange-300 bg-clip-text text-transparent">
                    Privacy Settings
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="text-white">
                    <p className="text-lg mb-4">Privacy controls coming soon...</p>
                    <p className="text-gray-400">Configure your privacy preferences and data sharing settings.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="relative">
              <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
                <div className="flex items-center mb-8 relative">
                  <div className="absolute -left-2 top-0 w-1 h-8 bg-gradient-to-b from-emerald-400 to-green-600 rounded-full"></div>
                  <FaLock className="mr-4 text-emerald-400 text-2xl animate-pulse" />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300 bg-clip-text text-transparent">
                    Security Settings
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="text-white">
                    <p className="text-lg mb-4">Security features coming soon...</p>
                    <p className="text-gray-400">Manage your password, two-factor authentication, and security preferences.</p>
                  </div>
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
