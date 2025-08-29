import React, { useState, useEffect } from 'react';
import {
  FaCreditCard, FaPlus, FaEdit, FaTrash, FaPaypal, FaMobile,
  FaUniversity, FaLock, FaCheckCircle, FaExclamationTriangle,
  FaStar, FaCopy, FaEye, FaEyeSlash, FaUser, FaMapMarkerAlt,
  FaEnvelope, FaPhone, FaSave, FaPercent
} from 'react-icons/fa';
import PaymentProfileService from '../../services/PaymentProfileService';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'paypal' | 'upi' | 'bank';
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  brand?: 'visa' | 'mastercard' | 'amex' | 'discover';
  email?: string; // for PayPal
  upiId?: string; // for UPI
  bankName?: string; // for bank transfer
  accountNumber?: string; // for bank transfer
  isDefault: boolean;
  isVerified: boolean;
  addedDate: string;
  lastUsed?: string;
}

interface BillingAddress {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const PaymentMethods: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [billingAddresses, setBillingAddresses] = useState<BillingAddress[]>([]);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'cards' | 'addresses' | 'settings'>('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [showCardDetails, setShowCardDetails] = useState<{[key: string]: boolean}>({});
  const [isSaving, setIsSaving] = useState(false);

  // Payment Profile State
  const [paymentProfile, setPaymentProfile] = useState(PaymentProfileService.getPaymentProfile());
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    firstName: paymentProfile.firstName,
    lastName: paymentProfile.lastName,
    email: paymentProfile.email,
    phone: paymentProfile.phone
  });

  const [addressForm, setAddressForm] = useState({
    street: paymentProfile.primaryAddress.street,
    city: paymentProfile.primaryAddress.city,
    state: paymentProfile.primaryAddress.state,
    zipCode: paymentProfile.primaryAddress.zipCode,
    country: paymentProfile.primaryAddress.country
  });

  const [billingForm, setBillingForm] = useState({
    street: paymentProfile.billingAddress.street,
    city: paymentProfile.billingAddress.city,
    state: paymentProfile.billingAddress.state,
    zipCode: paymentProfile.billingAddress.zipCode,
    country: paymentProfile.billingAddress.country,
    sameAsPrimary: paymentProfile.billingAddress.sameAsPrimary
  });

  // New payment method form state
  const [newPayment, setNewPayment] = useState({
    type: 'credit' as PaymentMethod['type'],
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    upiId: '',
    bankName: '',
    accountNumber: '',
    routingNumber: ''
  });

  // New billing address form state
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    autoSavePaymentMethods: true,
    securePaymentNotifications: true,
    allowInternationalPayments: true,
    requireCVVForSavedCards: true,
    paymentEmailNotifications: true
  });

  // Listen for cart updates from Header component
  useEffect(() => {
    const handleCartUpdate = (event: any) => {
      console.log('Cart updated in payment methods:', event.detail);
      // You can use this to show recent cart activity or payment prompts
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  // Mock data initialization
  useEffect(() => {
    // Import existing profile data if available
    PaymentProfileService.importFromUserProfile();
    
    const mockPaymentMethods: PaymentMethod[] = [
      {
        id: '1',
        type: 'credit',
        cardNumber: '4532 **** **** 1234',
        cardholderName: 'John Doe',
        expiryDate: '12/26',
        brand: 'visa',
        isDefault: true,
        isVerified: true,
        addedDate: '2024-01-15',
        lastUsed: '2024-01-20'
      }
    ];

    const mockBillingAddresses: BillingAddress[] = [
      {
        id: '1',
        name: 'Home Address',
        address: '123 Main Street, Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true
      }
    ];

    setPaymentMethods(mockPaymentMethods);
    setBillingAddresses(mockBillingAddresses);
    setIsLoading(false);
  }, []);

  // Listen for payment profile updates
  useEffect(() => {
    const handleProfileUpdate = (event: any) => {
      setPaymentProfile(event.detail);
    };

    window.addEventListener('paymentProfileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('paymentProfileUpdated', handleProfileUpdate);
  }, []);

  // Save profile information
  const saveProfileInfo = async () => {
    setIsSaving(true);
    try {
      PaymentProfileService.savePaymentProfile({
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        email: profileForm.email,
        phone: profileForm.phone
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profile information saved successfully!');
    } catch (error) {
      alert('Error saving profile information');
    } finally {
      setIsSaving(false);
    }
  };

  // Save address information
  const saveAddressInfo = async () => {
    setIsSaving(true);
    try {
      PaymentProfileService.savePaymentProfile({
        primaryAddress: {
          street: addressForm.street,
          city: addressForm.city,
          state: addressForm.state,
          zipCode: addressForm.zipCode,
          country: addressForm.country
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Address information saved successfully!');
    } catch (error) {
      alert('Error saving address information');
    } finally {
      setIsSaving(false);
    }
  };

  // Save billing address
  const saveBillingInfo = async () => {
    setIsSaving(true);
    try {
      PaymentProfileService.savePaymentProfile({
        billingAddress: {
          street: billingForm.sameAsPrimary ? addressForm.street : billingForm.street,
          city: billingForm.sameAsPrimary ? addressForm.city : billingForm.city,
          state: billingForm.sameAsPrimary ? addressForm.state : billingForm.state,
          zipCode: billingForm.sameAsPrimary ? addressForm.zipCode : billingForm.zipCode,
          country: billingForm.sameAsPrimary ? addressForm.country : billingForm.country,
          sameAsPrimary: billingForm.sameAsPrimary
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Billing address saved successfully!');
    } catch (error) {
      alert('Error saving billing address');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper functions
  const getCardIcon = (brand: string) => {
    switch (brand) {
      case 'visa': return '💳';
      case 'mastercard': return '💳';
      case 'amex': return '💳';
      default: return '💳';
    }
  };

  const getPaymentIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'credit':
      case 'debit':
        return <FaCreditCard className="text-blue-600" />;
      case 'paypal':
        return <FaPaypal className="text-blue-800" />;
      case 'upi':
        return <FaMobile className="text-green-600" />;
      case 'bank':
        return <FaUniversity className="text-gray-600" />;
      default:
        return <FaCreditCard className="text-gray-600" />;
    }
  };

  const formatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(.{4})/g, '$1 ').trim();
  };

  const handleAddPaymentMethod = async () => {
    if (newPayment.type === 'credit' || newPayment.type === 'debit') {
      if (!newPayment.cardNumber || !newPayment.cardholderName || !newPayment.expiryDate) {
        alert('Please fill in all required card details');
        return;
      }
    } else if (newPayment.type === 'paypal' && !newPayment.email) {
      alert('Please enter PayPal email');
      return;
    } else if (newPayment.type === 'upi' && !newPayment.upiId) {
      alert('Please enter UPI ID');
      return;
    }

    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: newPayment.type,
      ...(newPayment.type === 'credit' || newPayment.type === 'debit' ? {
        cardNumber: `**** **** **** ${newPayment.cardNumber.slice(-4)}`,
        cardholderName: newPayment.cardholderName,
        expiryDate: newPayment.expiryDate,
        brand: 'visa' // Would be detected from card number in real app
      } : {}),
      ...(newPayment.type === 'paypal' ? { email: newPayment.email } : {}),
      ...(newPayment.type === 'upi' ? { upiId: newPayment.upiId } : {}),
      isDefault: paymentMethods.length === 0,
      isVerified: false,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddPayment(false);
    setNewPayment({
      type: 'credit',
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
      email: '',
      upiId: '',
      bankName: '',
      accountNumber: '',
      routingNumber: ''
    });
  };

  const handleAddBillingAddress = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      alert('Please fill in all required fields');
      return;
    }

    const newAddr: BillingAddress = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: billingAddresses.length === 0
    };

    setBillingAddresses([...billingAddresses, newAddr]);
    setShowAddAddress(false);
    setNewAddress({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    });
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const setDefaultBillingAddress = (id: string) => {
    setBillingAddresses(addresses =>
      addresses.map(address => ({
        ...address,
        isDefault: address.id === id
      }))
    );
  };

  const deletePaymentMethod = (id: string) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(methods => methods.filter(method => method.id !== id));
    }
  };

  const deleteBillingAddress = (id: string) => {
    if (window.confirm('Are you sure you want to delete this billing address?')) {
      setBillingAddresses(addresses => addresses.filter(address => address.id !== id));
    }
  };

  const toggleCardDetails = (id: string) => {
    setShowCardDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Profile Setup</h1>
        <p className="text-gray-600">Complete your payment profile to enable quick checkout</p>
        
        {/* Completion Progress */}
        <div className="mt-4 bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${paymentProfile.completionPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">
            Profile completion: {paymentProfile.completionPercentage}%
          </span>
          {paymentProfile.isProfileComplete && (
            <span className="text-sm text-green-600 font-medium flex items-center">
              <FaCheckCircle className="mr-1" size={14} />
              Ready for checkout!
            </span>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        {[
          { id: 'profile', label: 'Personal Info', icon: FaUser },
          { id: 'cards', label: 'Payment Methods', icon: FaCreditCard },
          { id: 'addresses', label: 'Addresses', icon: FaMapMarkerAlt },
          { id: 'settings', label: 'Settings', icon: FaLock }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
            {/* Show completion indicator */}
            {tab.id === 'profile' && paymentProfile.isPersonalInfoComplete && (
              <FaCheckCircle size={12} className="text-green-500" />
            )}
            {tab.id === 'addresses' && paymentProfile.isPrimaryAddressComplete && paymentProfile.isBillingAddressComplete && (
              <FaCheckCircle size={12} className="text-green-500" />
            )}
            {tab.id === 'cards' && paymentProfile.hasPaymentMethod && (
              <FaCheckCircle size={12} className="text-green-500" />
            )}
          </button>
        ))}
      </div>

      {/* Personal Information Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <p className="text-gray-600 text-sm">Enter your basic information for checkout</p>
              </div>
              {paymentProfile.isPersonalInfoComplete && (
                <div className="flex items-center text-green-600">
                  <FaCheckCircle className="mr-2" />
                  <span className="font-medium">Complete</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="inline mr-2" />
                  First Name *
                </label>
                <input
                  type="text"
                  value={profileForm.firstName}
                  onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="inline mr-2" />
                  Last Name *
                </label>
                <input
                  type="text"
                  value={profileForm.lastName}
                  onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaEnvelope className="inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPhone className="inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={saveProfileInfo}
                disabled={isSaving}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <FaSave size={16} />
                <span>{isSaving ? 'Saving...' : 'Save Information'}</span>
              </button>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Primary Address</h2>
                <p className="text-gray-600 text-sm">Your main address for shipping and billing</p>
              </div>
              {paymentProfile.isPrimaryAddressComplete && (
                <div className="flex items-center text-green-600">
                  <FaCheckCircle className="mr-2" />
                  <span className="font-medium">Complete</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Street Address *
                </label>
                <input
                  type="text"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({...addressForm, street: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    value={addressForm.zipCode}
                    onChange={(e) => setAddressForm({...addressForm, zipCode: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  value={addressForm.country}
                  onChange={(e) => setAddressForm({...addressForm, country: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="India">India</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={saveAddressInfo}
                disabled={isSaving}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <FaSave size={16} />
                <span>{isSaving ? 'Saving...' : 'Save Address'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'cards' && (
        <div className="space-y-6">
          {/* Add Payment Method Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Your Payment Methods</h2>
            <button
              onClick={() => setShowAddPayment(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus size={14} />
              <span>Add Payment Method</span>
            </button>
          </div>

          {/* Payment Methods List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                className={`bg-white border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
                  method.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getPaymentIcon(method.type)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-800 capitalize">{method.type}</span>
                        {method.isDefault && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      {method.isVerified ? (
                        <div className="flex items-center space-x-1 text-green-600 text-sm">
                          <FaCheckCircle size={12} />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-yellow-600 text-sm">
                          <FaExclamationTriangle size={12} />
                          <span>Pending Verification</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    {!method.isDefault && (
                      <button
                        onClick={() => setDefaultPaymentMethod(method.id)}
                        className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                        title="Set as default"
                      >
                        <FaStar size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => toggleCardDetails(method.id)}
                      className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                      title="View details"
                    >
                      {showCardDetails[method.id] ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                    <button
                      onClick={() => deletePaymentMethod(method.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {method.type === 'credit' || method.type === 'debit' ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getCardIcon(method.brand || 'visa')}</span>
                        <span className="font-mono text-gray-700">
                          {showCardDetails[method.id] ? method.cardNumber : `**** **** **** ${method.cardNumber?.slice(-4)}`}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{method.cardholderName}</p>
                        <p>Expires: {method.expiryDate}</p>
                      </div>
                    </>
                  ) : method.type === 'paypal' ? (
                    <div className="text-sm text-gray-700">
                      <p className="font-medium">{method.email}</p>
                    </div>
                  ) : method.type === 'upi' ? (
                    <div className="text-sm text-gray-700">
                      <p className="font-medium">{method.upiId}</p>
                    </div>
                  ) : null}

                  {method.lastUsed && (
                    <p className="text-xs text-gray-500">Last used: {method.lastUsed}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Payment Method Modal */}
          {showAddPayment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Add Payment Method</h3>
                  <button
                    onClick={() => setShowAddPayment(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Payment Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'credit', label: 'Credit Card' },
                        { value: 'debit', label: 'Debit Card' },
                        { value: 'paypal', label: 'PayPal' },
                        { value: 'upi', label: 'UPI' }
                      ].map(type => (
                        <label
                          key={type.value}
                          className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                            newPayment.type === type.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentType"
                            value={type.value}
                            checked={newPayment.type === type.value}
                            onChange={(e) => setNewPayment({...newPayment, type: e.target.value as any})}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">{type.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Card Details */}
                  {(newPayment.type === 'credit' || newPayment.type === 'debit') && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          value={newPayment.cardNumber}
                          onChange={(e) => {
                            const formatted = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                            setNewPayment({...newPayment, cardNumber: formatted});
                          }}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          maxLength={19}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          value={newPayment.cardholderName}
                          onChange={(e) => setNewPayment({...newPayment, cardholderName: e.target.value})}
                          placeholder="John Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            value={newPayment.expiryDate}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length >= 2) {
                                value = value.substring(0, 2) + '/' + value.substring(2, 4);
                              }
                              setNewPayment({...newPayment, expiryDate: value});
                            }}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input
                            type="text"
                            value={newPayment.cvv}
                            onChange={(e) => setNewPayment({...newPayment, cvv: e.target.value.replace(/\D/g, '')})}
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* PayPal Email */}
                  {newPayment.type === 'paypal' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Email</label>
                      <input
                        type="email"
                        value={newPayment.email}
                        onChange={(e) => setNewPayment({...newPayment, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}

                  {/* UPI ID */}
                  {newPayment.type === 'upi' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                      <input
                        type="text"
                        value={newPayment.upiId}
                        onChange={(e) => setNewPayment({...newPayment, upiId: e.target.value})}
                        placeholder="john@paytm"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddPayment(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPaymentMethod}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Method
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Billing Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Billing Addresses</h2>
            <button
              onClick={() => setShowAddAddress(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus size={14} />
              <span>Add Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {billingAddresses.map(address => (
              <div
                key={address.id}
                className={`bg-white border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
                  address.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-800">{address.name}</h3>
                      {address.isDefault && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{address.address}</p>
                      <p>{address.city}, {address.state} {address.zipCode}</p>
                      <p>{address.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    {!address.isDefault && (
                      <button
                        onClick={() => setDefaultBillingAddress(address.id)}
                        className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                        title="Set as default"
                      >
                        <FaStar size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteBillingAddress(address.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Address Modal */}
          {showAddAddress && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Add Billing Address</h3>
                  <button
                    onClick={() => setShowAddAddress(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Name</label>
                    <input
                      type="text"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                      placeholder="Home, Office, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                      placeholder="123 Main Street"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                        placeholder="New York"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        placeholder="NY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        value={newAddress.zipCode}
                        onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                        placeholder="10001"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <select
                        value={newAddress.country}
                        onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="India">India</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddAddress(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddBillingAddress}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Payment Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Payment Preferences</h2>
          
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
            {[
              {
                key: 'autoSavePaymentMethods',
                title: 'Auto-save payment methods',
                description: 'Automatically save new payment methods for faster checkout'
              },
              {
                key: 'securePaymentNotifications',
                title: 'Secure payment notifications',
                description: 'Receive notifications for all payment activities'
              },
              {
                key: 'allowInternationalPayments',
                title: 'International payments',
                description: 'Allow payments to international vendors'
              },
              {
                key: 'requireCVVForSavedCards',
                title: 'Require CVV for saved cards',
                description: 'Always require CVV verification for saved payment methods'
              },
              {
                key: 'paymentEmailNotifications',
                title: 'Email notifications',
                description: 'Send payment confirmations and receipts via email'
              }
            ].map(setting => (
              <div key={setting.key} className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{setting.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paymentSettings[setting.key as keyof typeof paymentSettings]}
                    onChange={(e) => setPaymentSettings({
                      ...paymentSettings,
                      [setting.key]: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>

          {/* Save Settings Button */}
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
