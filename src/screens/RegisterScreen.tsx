import React, { useEffect, useState } from 'react';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({} as { firstName?: string; lastName?: string; email?: string; company?: string; password?: string; confirmPassword?: string });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors({ ...formErrors, [field]: undefined });
    }
  };

  const validateForm = () => {
    const errors: { firstName?: string; lastName?: string; email?: string; company?: string; password?: string; confirmPassword?: string } = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.company.trim()) errors.company = 'Company name is required';
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setTimeout(() => {
        alert('Registration successful! Welcome to Earth Resource Technology.');
        setFormData({ firstName: '', lastName: '', email: '', company: '', password: '', confirmPassword: '' });
      }, 500);
    } else {
      alert('Please fix the errors in the form');
    }
  };

  return (
    <div className="min-h-screen py-8 text-black">
      {/* Hero Section */}
      <div className="relative h-64 flex items-center justify-center bg-blue-900 text-white">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Register Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Register</h1>
          <p className="text-lg">Join Earth Resource Technology</p>
        </div>
      </div>
      {/* Main Content */}
      <div className="relative z-10">
        {/* Registration Form */}
        <section className="max-w-2xl mx-auto p-4">
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-black mb-2">Create Your Account</h2>
            <div className="w-12 h-1 bg-orange-500 mb-6" />
            <p className="text-black mb-4">
              Register to access exclusive mining resources, software demos, and industry insights. Our members receive regular updates on mining technology advancements and special event invitations.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold mb-1 text-black">First Name *</label>
                  <input
                    type="text"
                    placeholder="Your First Name"
                    value={formData.firstName}
                    onChange={e => handleChange('firstName', e.target.value)}
                    className={`w-full px-4 py-2 rounded border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {formErrors.firstName && <div className="text-red-500 text-xs mt-1">{formErrors.firstName}</div>}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold mb-1 text-black">Last Name *</label>
                  <input
                    type="text"
                    placeholder="Your Last Name"
                    value={formData.lastName}
                    onChange={e => handleChange('lastName', e.target.value)}
                    className={`w-full px-4 py-2 rounded border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {formErrors.lastName && <div className="text-red-500 text-xs mt-1">{formErrors.lastName}</div>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-black">Email *</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-2 rounded border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
                {formErrors.email && <div className="text-red-500 text-xs mt-1">{formErrors.email}</div>}
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-black">Company *</label>
                <input
                  type="text"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={e => handleChange('company', e.target.value)}
                  className={`w-full px-4 py-2 rounded border ${formErrors.company ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
                {formErrors.company && <div className="text-red-500 text-xs mt-1">{formErrors.company}</div>}
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold mb-1 text-black">Password *</label>
                  <input
                    type="password"
                    placeholder="Password (min 8 characters)"
                    value={formData.password}
                    onChange={e => handleChange('password', e.target.value)}
                    className={`w-full px-4 py-2 rounded border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {formErrors.password && <div className="text-red-500 text-xs mt-1">{formErrors.password}</div>}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold mb-1 text-black">Confirm Password *</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={e => handleChange('confirmPassword', e.target.value)}
                    className={`w-full px-4 py-2 rounded border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {formErrors.confirmPassword && <div className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</div>}
                </div>
              </div>
              <button type="submit" className="bg-blue-700 text-white font-bold px-6 py-2 rounded-full border-2 border-blue-700 hover:bg-white hover:text-blue-700 transition w-full">Register</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
} 