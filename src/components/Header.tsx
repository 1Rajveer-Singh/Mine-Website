import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import PaymentProfileService from '../services/PaymentProfileService';
import {
  FaShoppingCart, FaBars, FaTimes, FaChevronDown, FaUser, FaCog, 
  FaHeart, FaHistory, FaQuestionCircle, FaSignOutAlt,
  FaSearch, FaCrown, FaMicrophone, FaMicrophoneSlash,
  FaTrash, FaPlus, FaMinus, FaSignInAlt, FaUserPlus, FaBell,
  FaShoppingBag, FaHeadset, FaExclamationTriangle, FaCreditCard
} from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Core navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Essential states only
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  // Modal states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  // Cart and user data
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState<Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    type?: string;
  }>>([]);
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  // Advanced Checkout States
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    
    // Billing Address
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    billingCountry: 'United States',
    
    // Shipping Address
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    shippingCountry: 'United States',
    sameAsBilling: true,
    
    // Payment Information
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    
    // Additional
    orderNotes: '',
    newsletter: false,
    terms: false
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Simple user profile - default logged out
  const [userProfile, setUserProfile] = useState({
    name: 'Guest User',
    email: '',
    role: 'Guest',
    avatar: '/assets/imageperson1.jpg'
  });

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const authToken = localStorage.getItem('authToken');
      const storedProfile = localStorage.getItem('userProfile');
      
      if (authToken && storedProfile) {
        try {
          const profile = JSON.parse(storedProfile);
          
          // Ensure profile has required properties
          const safeProfile = {
            name: profile.name || (profile.firstName ? `${profile.firstName} ${profile.lastName}` : 'User'),
            email: profile.email || '',
            role: profile.role || 'User',
            avatar: profile.avatar || '/assets/imageperson1.jpg',
            ...profile
          };
          
          setIsLoggedIn(true);
          setUserProfile(safeProfile);
          setIsPremiumUser(safeProfile.role?.includes('Premium') || safeProfile.role?.includes('Demo'));
        } catch (error) {
          console.error('Error parsing stored profile:', error);
          // Clear invalid data
          localStorage.removeItem('authToken');
          localStorage.removeItem('userProfile');
        }
      }
    };

    const loadCartData = () => {
      try {
        const storedCart = localStorage.getItem('shopping_cart');
        if (storedCart) {
          const cart = JSON.parse(storedCart);
          setCartItems(cart);
          setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
          setCartTotal(cart.reduce((total: number, item: any) => total + (item.price * item.quantity), 0));
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
        localStorage.removeItem('shopping_cart');
      }
    };

    checkAuthStatus();
    loadCartData();
  }, []);

  // Lock page scroll when auth modals are open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isLoginModalOpen || isRegisterModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || '';
    }
    return () => {
      document.body.style.overflow = originalOverflow || '';
    };
  }, [isLoginModalOpen, isRegisterModalOpen]);

  // Refs
  const searchRef = useRef<HTMLInputElement>(null);
  const lightningUnderlineRef = useRef<HTMLDivElement>(null);
  const lightningArrowRef = useRef<HTMLDivElement>(null);
  const navLinksRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  // Smart positioning hook
  const useSmartDropdownPosition = (isOpen: boolean, dropdownRef: React.RefObject<HTMLDivElement | null>) => {
    const [position, setPosition] = useState({ 
      right: '0', 
      left: 'auto', 
      transform: 'none',
      marginRight: '0'
    });

    useEffect(() => {
      if (!isOpen || !dropdownRef.current) return;

      const updatePosition = () => {
        const dropdown = dropdownRef.current;
        if (!dropdown) return;

        const rect = dropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const isMobile = viewportWidth < 768;
        const padding = isMobile ? 8 : 16; // Less padding on mobile
        
        // Calculate how much the dropdown overflows
        const rightOverflow = rect.right - (viewportWidth - padding);
        
        if (rightOverflow > 0) {
          // If there's overflow, adjust positioning
          if (rect.width > viewportWidth - padding * 2) {
            // If dropdown is wider than available space, make it fit
            setPosition({
              right: '0',
              left: 'auto',
              transform: `translateX(-${rightOverflow}px)`,
              marginRight: '0'
            });
          } else {
            // Normal adjustment - move the dropdown left
            setPosition({
              right: `${rightOverflow + padding}px`,
              left: 'auto',
              transform: 'none',
              marginRight: '0'
            });
          }
        } else {
          // No overflow, use default positioning
          setPosition({
            right: '0',
            left: 'auto',
            transform: 'none',
            marginRight: '0'
          });
        }
      };

      // Use requestAnimationFrame to ensure DOM is updated
      const timeoutId = setTimeout(() => {
        updatePosition();
      }, 0);

      // Update position on resize
      window.addEventListener('resize', updatePosition);
      
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', updatePosition);
      };
    }, [isOpen]);

    return position;
  };

  // Get smart positioning for dropdowns
  const cartPosition = useSmartDropdownPosition(isCartOpen, cartDropdownRef);
  const profilePosition = useSmartDropdownPosition(isProfileDropdownOpen, profileDropdownRef);
  const notificationPosition = useSmartDropdownPosition(isNotificationOpen, notificationDropdownRef);

  // Navigation items with dropdowns
  const navItems = [
    { 
      name: 'Home', 
      route: '/', 
      hasDropdown: false 
    },
    { 
      name: 'About Us', 
      route: '/about', 
      hasDropdown: false 
    },
    { 
      name: 'Services', 
      route: '/services', 
      hasDropdown: false
    },
    { 
      name: 'Software', 
      route: '/software', 
      hasDropdown: false
    },
    { 
      name: 'Gallery', 
      route: '/gallery', 
      hasDropdown: false 
    },
    { 
      name: 'People', 
      route: '/people', 
      hasDropdown: false 
    },
    { 
      name: 'Library', 
      route: '/library', 
      hasDropdown: false 
    },
    { 
      name: 'Jobs', 
      route: '/jobs', 
      hasDropdown: false 
    }
  ];

  // Profile menu items (enhanced with active state detection)
  const profileMenuItems = [
    { icon: FaUser, label: 'Edit Profile', route: '/profile/settings', description: 'Manage your personal information' },
    { icon: FaCreditCard, label: 'Payment Methods', route: '/profile/payment', description: 'Manage payment cards and billing', highlight: true },
    { icon: FaShoppingBag, label: 'Order History', route: '/profile/orders', description: 'View your past orders and downloads' },
    { icon: FaHeart, label: 'Wishlist', route: '/profile/wishlist', description: 'Your saved favorite items' },
    { icon: FaHeadset, label: 'Help & Support', route: '/profile/support', description: 'Get help and contact support' },
  ];

  // Check if current route is a profile route
  const isProfileRoute = location.pathname.startsWith('/profile');
  
  // Get active profile section
  const getActiveProfileSection = () => {
    const path = location.pathname;
    const activeItem = profileMenuItems.find(item => path === item.route);
    return activeItem?.label || null;
  };

  // Utility functions
  const getSearchSuggestions = (query: string) => {
    const suggestions = [
      'Blast Designer Pro',
      'Underground Mining Tools',
      'Rock Fragmentation Analysis',
      'Tunnel Design Software',
      'Mining Consultation Services',
      'Training Programs'
    ];
    return suggestions.filter(s => 
      s.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getCartItems = () => cartItems;

  // Cart management functions
  const saveCartToStorage = (items: typeof cartItems) => {
    try {
      localStorage.setItem('shopping_cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  };

  const addToCart = (item: {
    id: number;
    name: string;
    price: number;
    image: string;
    type?: string;
  }) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    let newCartItems;

    if (existingItemIndex >= 0) {
      // Item already exists, increase quantity
      newCartItems = cartItems.map((cartItem, index) => 
        index === existingItemIndex 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      // New item
      newCartItems = [...cartItems, { ...item, quantity: 1 }];
    }

    setCartItems(newCartItems);
    setCartCount(newCartItems.reduce((total, item) => total + item.quantity, 0));
    setCartTotal(newCartItems.reduce((total, item) => total + (item.price * item.quantity), 0));
    saveCartToStorage(newCartItems);

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('cartUpdated', { 
      detail: { 
        cartItems: newCartItems, 
        cartCount: newCartItems.reduce((total, item) => total + item.quantity, 0),
        cartTotal: newCartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      } 
    }));
  };

  // Make cart functions globally available
  useEffect(() => {
    (window as any).addToCart = addToCart;
    (window as any).removeFromCart = removeFromCart;
    (window as any).updateCartQuantity = updateCartQuantity;
    (window as any).clearCart = clearCart;
    (window as any).getCartItems = () => cartItems;
    
    return () => {
      delete (window as any).addToCart;
      delete (window as any).removeFromCart;
      delete (window as any).updateCartQuantity;
      delete (window as any).clearCart;
      delete (window as any).getCartItems;
    };
  }, [cartItems]);

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    const newCartItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    );

    setCartItems(newCartItems);
    setCartCount(newCartItems.reduce((total, item) => total + item.quantity, 0));
    setCartTotal(newCartItems.reduce((total, item) => total + (item.price * item.quantity), 0));
    saveCartToStorage(newCartItems);
  };

  const removeFromCart = (id: number) => {
    const newCartItems = cartItems.filter(item => item.id !== id);
    
    setCartItems(newCartItems);
    setCartCount(newCartItems.reduce((total, item) => total + item.quantity, 0));
    setCartTotal(newCartItems.reduce((total, item) => total + (item.price * item.quantity), 0));
    saveCartToStorage(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    setCartTotal(0);
    localStorage.removeItem('shopping_cart');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Check if user is logged in
    const isLoggedIn = !!localStorage.getItem('authToken');
    if (!isLoggedIn) {
      alert('Please log in to continue with checkout');
      setIsLoginModalOpen(true);
      return;
    }
    
    // Check if payment profile is complete
    const checkoutRequirements = PaymentProfileService.getCheckoutRequirements();
    if (!checkoutRequirements.isReady) {
      // Show profile completion requirement modal
      const missingInfo = checkoutRequirements.missingFields.join(', ');
      const shouldRedirect = window.confirm(
        `Your payment profile is incomplete (${checkoutRequirements.completionPercentage}% complete).\n\n` +
        `Missing information: ${missingInfo}\n\n` +
        `Would you like to complete your profile now? This is required for checkout.`
      );
      
      if (shouldRedirect) {
        navigate('/profile/payment');
        setIsCartOpen(false);
      }
      return;
    }
    
    // Reset checkout form and state
    setCheckoutStep(1);
    setOrderConfirmed(false);
    setFormErrors({});
    setIsProcessing(false);
    
    // Pre-fill checkout form with profile data
    const paymentProfile = PaymentProfileService.getPaymentProfile();
    setCheckoutForm(prev => ({
      ...prev,
      firstName: paymentProfile.firstName,
      lastName: paymentProfile.lastName,
      email: paymentProfile.email,
      phone: paymentProfile.phone,
      billingAddress: paymentProfile.primaryAddress.street,
      billingCity: paymentProfile.primaryAddress.city,
      billingState: paymentProfile.primaryAddress.state,
      billingZip: paymentProfile.primaryAddress.zipCode,
      billingCountry: paymentProfile.primaryAddress.country,
      shippingAddress: paymentProfile.billingAddress.sameAsPrimary ? paymentProfile.primaryAddress.street : paymentProfile.billingAddress.street,
      shippingCity: paymentProfile.billingAddress.sameAsPrimary ? paymentProfile.primaryAddress.city : paymentProfile.billingAddress.city,
      shippingState: paymentProfile.billingAddress.sameAsPrimary ? paymentProfile.primaryAddress.state : paymentProfile.billingAddress.state,
      shippingZip: paymentProfile.billingAddress.sameAsPrimary ? paymentProfile.primaryAddress.zipCode : paymentProfile.billingAddress.zipCode,
      shippingCountry: paymentProfile.billingAddress.sameAsPrimary ? paymentProfile.primaryAddress.country : paymentProfile.billingAddress.country,
      sameAsBilling: paymentProfile.billingAddress.sameAsPrimary,
      paymentMethod: paymentProfile.defaultPaymentMethod?.type || 'credit'
    }));
    
    // Show checkout modal
    setIsCheckoutModalOpen(true);
    setIsCartOpen(false);
  };

  // Form validation functions
  const validateStep = (step: number): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (step === 1) {
      // Customer Information validation
      if (!checkoutForm.firstName.trim()) errors.firstName = 'First name is required';
      if (!checkoutForm.lastName.trim()) errors.lastName = 'Last name is required';
      if (!checkoutForm.email.trim()) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(checkoutForm.email)) errors.email = 'Email is invalid';
      if (!checkoutForm.phone.trim()) errors.phone = 'Phone number is required';
    }
    
    if (step === 2) {
      // Address validation
      if (!checkoutForm.billingAddress.trim()) errors.billingAddress = 'Billing address is required';
      if (!checkoutForm.billingCity.trim()) errors.billingCity = 'Billing city is required';
      if (!checkoutForm.billingState.trim()) errors.billingState = 'Billing state is required';
      if (!checkoutForm.billingZip.trim()) errors.billingZip = 'Billing ZIP code is required';
      
      if (!checkoutForm.sameAsBilling) {
        if (!checkoutForm.shippingAddress.trim()) errors.shippingAddress = 'Shipping address is required';
        if (!checkoutForm.shippingCity.trim()) errors.shippingCity = 'Shipping city is required';
        if (!checkoutForm.shippingState.trim()) errors.shippingState = 'Shipping state is required';
        if (!checkoutForm.shippingZip.trim()) errors.shippingZip = 'Shipping ZIP code is required';
      }
    }
    
    if (step === 3) {
      // Payment validation
      if (checkoutForm.paymentMethod === 'credit') {
        if (!checkoutForm.cardNumber.trim()) errors.cardNumber = 'Card number is required';
        else if (!/^\d{16}$/.test(checkoutForm.cardNumber.replace(/\s/g, ''))) errors.cardNumber = 'Invalid card number';
        if (!checkoutForm.expiryDate.trim()) errors.expiryDate = 'Expiry date is required';
        else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(checkoutForm.expiryDate)) errors.expiryDate = 'Invalid expiry date (MM/YY)';
        if (!checkoutForm.cvv.trim()) errors.cvv = 'CVV is required';
        else if (!/^\d{3,4}$/.test(checkoutForm.cvv)) errors.cvv = 'Invalid CVV';
        if (!checkoutForm.nameOnCard.trim()) errors.nameOnCard = 'Name on card is required';
      }
      if (!checkoutForm.terms) errors.terms = 'You must accept the terms and conditions';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleFormChange = (field: string, value: string | boolean) => {
    setCheckoutForm(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-copy billing to shipping if sameAsBilling is true
      if (field === 'sameAsBilling' && value) {
        updated.shippingAddress = updated.billingAddress;
        updated.shippingCity = updated.billingCity;
        updated.shippingState = updated.billingState;
        updated.shippingZip = updated.billingZip;
        updated.shippingCountry = updated.billingCountry;
      }
      
      return updated;
    });
    
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Navigate between checkout steps
  const nextStep = () => {
    if (validateStep(checkoutStep)) {
      setCheckoutStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCheckoutStep(prev => Math.max(prev - 1, 1));
  };

  // Process the final checkout
  const processCheckout = async () => {
    if (!validateStep(3)) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order number
      const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Success
      setOrderConfirmed(true);
      setCheckoutStep(4);
      
      // Clear cart after successful order
      setTimeout(() => {
        clearCart();
      }, 3000);
      
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate order summary
  const calculateTax = () => cartTotal * 0.08; // 8% tax
  const calculateShipping = () => cartTotal > 100 ? 0 : 15; // Free shipping over $100
  const calculateTotal = () => cartTotal + calculateTax() + calculateShipping();

  // Handlers
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchExpanded(false);
  };

  const startVoiceSearch = () => {
    // TypeScript declarations for Speech Recognition
    interface SpeechRecognitionInterface {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onstart: () => void;
      onresult: (event: any) => void;
      onerror: (event: any) => void;
      onend: () => void;
      start: () => void;
    }

    const win = window as any;
    
    if (!win.webkitSpeechRecognition && !win.SpeechRecognition) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
    const recognition: SpeechRecognitionInterface = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsVoiceSearch(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      handleSearch(transcript);
      setIsVoiceSearch(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsVoiceSearch(false);
    };

    recognition.onend = () => {
      setIsVoiceSearch(false);
    };

    recognition.start();
  };

  // Notification management functions
  const handleMarkAllRead = () => {
    console.log('Marking all notifications as read');
    setNotificationCount(0);
    setIsNotificationOpen(false);
  };

  const handleViewAllNotifications = () => {
    console.log('Viewing all notifications');
    setIsNotificationOpen(false);
    navigate('/notifications');
  };

  // Enhanced profile navigation handler
  const handleProfileNavigation = (item: any) => {
    console.log('=== Profile Navigation Debug ===');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('Item:', item);
    console.log('Route:', item.route);
    console.log('authToken in localStorage:', localStorage.getItem('authToken'));
    
    try {
      // Always close dropdown first
      setIsProfileDropdownOpen(false);
      
      // Check if user is logged in
      if (!isLoggedIn) {
        console.warn('User not logged in, opening login modal');
        setPendingRoute(item.route);
        setIsLoginModalOpen(true);
        return;
      }

      console.log('User is logged in, navigating to:', item.label, 'Route:', item.route);
      
      // Navigate immediately
      console.log('Executing navigation to:', item.route);
      navigate(item.route);
      
      console.log(`Navigation to ${item.label} completed successfully`);
    } catch (error) {
      console.error('Error in profile navigation:', error);
    }
  };

  // Direct navigation function (for testing)
  const handleDirectNavigation = (route: string) => {
    console.log('Direct navigation to:', route);
    setIsProfileDropdownOpen(false);
    navigate(route);
  };

  const handleLogout = () => {
    // Clear user session
    setIsLoggedIn(false);
    setIsProfileDropdownOpen(false);
    
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfile');
    sessionStorage.clear();
    
    // Reset user profile to default
    setUserProfile({
      name: 'Guest User',
      email: '',
      role: 'Guest',
      avatar: '/assets/imageperson1.jpg'
    });
    
    // Navigate to home page
    navigate('/');
    
    // Optional: Show logout confirmation
    console.log('User logged out successfully');
  };

  // Modal handlers
  const handleLoginSuccess = (userProfile: any) => {
    console.log('=== Login Success Debug ===');
    console.log('User profile received:', userProfile);
    
    // Ensure userProfile has required properties
    const safeUserProfile = {
      name: userProfile.name || userProfile.firstName ? `${userProfile.firstName} ${userProfile.lastName}` : 'User',
      email: userProfile.email || '',
      role: userProfile.role || 'User',
      avatar: userProfile.avatar || '/assets/imageperson1.jpg',
      ...userProfile
    };
    
    setIsLoggedIn(true);
    setUserProfile(safeUserProfile);
    setIsPremiumUser(safeUserProfile.role?.includes('Premium') || safeUserProfile.role?.includes('Demo'));
    setIsLoginModalOpen(false);
    
    console.log('Login state updated successfully');
    console.log('isLoggedIn should now be:', true);

    // Navigate to any pending profile route after login
    if (pendingRoute) {
      const to = pendingRoute;
      setPendingRoute(null);
      navigate(to);
    }
  };

  const handleRegisterSuccess = (userProfile: any) => {
    console.log('=== Register Success Debug ===');
    console.log('User profile received:', userProfile);
    
    setIsLoggedIn(true);
    setUserProfile(userProfile);
    setIsPremiumUser(false);
    setIsRegisterModalOpen(false);
    
    console.log('Registration state updated successfully');

    // Navigate to any pending profile route after registration
    if (pendingRoute) {
      const to = pendingRoute;
      setPendingRoute(null);
      navigate(to);
    }
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target) return;
      
      // Check if click is within any dropdown
      const profileDropdown = profileDropdownRef.current;
      const cartDropdown = cartDropdownRef.current;
      const notificationDropdown = notificationDropdownRef.current;
      
      // Don't close dropdowns if clicking inside them
      if (profileDropdown && profileDropdown.contains(target)) {
        return;
      }
      if (cartDropdown && cartDropdown.contains(target)) {
        return;
      }
      if (notificationDropdown && notificationDropdown.contains(target)) {
        return;
      }
      
      // Close all dropdowns if clicked outside
      setActiveDropdown(null);
      setActiveMobileDropdown(null);
      setIsCartOpen(false);
      setIsNotificationOpen(false);
      setIsProfileDropdownOpen(false);
      
      // Don't close modals on outside click - they handle their own backdrop clicks
    };

    // Close modals on escape key
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <>
      {/* Professional White Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100">
        <div className="w-full max-w-full px-2 sm:px-4 lg:px-6 xl:px-8 relative">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-purple-50/10 to-blue-50/20"></div>
          {/* Elegant pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
          
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18 xl:h-20 relative z-10">
            
            {/* Left: Mobile Menu Button (Mobile Only) */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 relative overflow-hidden group border border-gray-200 hover:border-blue-300 hover:shadow-md"
              >
                {/* Elegant hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
                {/* Subtle glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-100/50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                
                {isMobileMenuOpen ? (
                  <FaTimes size={18} className="relative z-10 transform rotate-0 transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110" />
                ) : (
                  <FaBars size={18} className="relative z-10 transform rotate-0 transition-transform duration-300 group-hover:scale-110" />
                )}
              </button>
            </div>

            {/* Center: Brand Name (Mobile) / Professional Desktop Navigation (Desktop) */}
            <div className="flex-1 flex items-center justify-center md:justify-start">
              
              {/* Mobile: Brand Name Only */}
              <div className="md:hidden">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 relative group">
                  <span className="relative z-10">BIMS</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </Link>
              </div>

              {/* Desktop: Professional Logo + Navigation */}
              <div className="hidden md:flex items-center space-x-8" style={{ marginLeft: '200px' }}>
                
                {/* Professional Logo (Desktop Only) */}
                <Link to="/" className="group relative flex-shrink-0">
                  <div className="relative">
                    {/* Elegant glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-purple-200/40 to-blue-200/40 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md"></div>
                    {/* Professional border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-all duration-300 p-[1px]"></div>
                    
                    <img
                      src="/assets/bims.jpg"
                      alt="Company Logo"
                      className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 xl:h-12 xl:w-12 rounded-xl object-cover shadow-lg relative z-10 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                    />
                    
                    {/* Corner accent */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                </Link>

                {/* Desktop Navigation - Professional White Style */}
                <div className="hidden lg:flex">
                  <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-lg border border-gray-200 relative overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Elegant background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-blue-50/30"></div>
                    {/* Sophisticated pattern */}
                    <div className="absolute inset-0 opacity-5" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                    
                    <nav className="flex items-center space-x-1 relative z-10">
                      {navItems.map((item, index) => (
                        <div key={item.name} className="relative group">
                          {item.hasDropdown ? (
                            <button
                              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-300 py-2.5 px-3 rounded-lg hover:bg-white/70 font-medium text-sm whitespace-nowrap relative overflow-hidden group border border-transparent hover:border-blue-200 hover:shadow-md"
                              onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                              onMouseEnter={() => setActiveDropdown(item.name)}
                              onMouseLeave={() => setActiveDropdown(null)}
                            >
                              {/* Professional hover effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                              {/* Subtle glow */}
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg blur-sm"></div>
                              
                              <span className="relative z-10 group-hover:text-blue-700 font-medium">{item.name === 'About Us' ? 'About' : item.name}</span>
                              <FaChevronDown 
                                className={`text-xs transition-all duration-300 relative z-10 group-hover:text-blue-600 ${
                                  activeDropdown === item.name ? 'rotate-180 text-blue-600' : ''
                                }`} 
                              />
                            </button>
                          ) : (
                            <Link
                              to={item.route}
                              className={`font-medium text-sm whitespace-nowrap transition-all duration-300 py-2.5 px-3 rounded-lg relative overflow-hidden group border ${
                                location.pathname === item.route 
                                  ? 'text-blue-600 bg-white shadow-lg border-blue-200 font-semibold' 
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-white/70 border-transparent hover:border-blue-200 hover:shadow-md'
                              }`}
                            >
                              {/* Active state effect */}
                              {location.pathname === item.route && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"></div>
                              )}
                              
                              {/* Professional hover effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                              {/* Elegant glow */}
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-purple-100/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg blur-sm"></div>
                              
                              <span className="relative z-10 group-hover:text-blue-700 font-medium">{item.name === 'About Us' ? 'About' : item.name}</span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Tablet Navigation - Professional White Style */}
                <div className="hidden md:flex lg:hidden">
                  <div className="bg-gray-50/80 rounded-xl px-3 py-2 shadow-lg border border-gray-200 max-w-full overflow-hidden relative hover:shadow-xl transition-all duration-300">
                    {/* Professional background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20"></div>
                    
                    <nav className="flex items-center space-x-1 relative z-10">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.route}
                          className={`text-xs font-medium px-2 py-2 rounded-md transition-all duration-300 whitespace-nowrap relative overflow-hidden group border ${
                            location.pathname === item.route 
                              ? 'text-blue-600 bg-white shadow-md border-blue-200 font-semibold' 
                              : 'text-gray-700 hover:text-blue-600 hover:bg-white/70 border-transparent hover:border-blue-200 hover:shadow-sm'
                          }`}
                        >
                          {/* Professional hover effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md blur-sm"></div>
                          
                          <span className="relative z-10 group-hover:text-blue-700">
                            {item.name === 'About Us' ? 'About' : 
                             item.name === 'Services' ? 'Service' : 
                             item.name === 'Software' ? 'SW' :
                             item.name === 'Library' ? 'Lib' :
                             item.name}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons (Mobile/Tablet/Desktop) */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              
              {/* Professional Cart Button */}
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 overflow-hidden group border border-gray-200 hover:border-blue-300 hover:shadow-md"
                >
                  {/* Professional hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
                  {/* Elegant glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-100/40 to-purple-100/40 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                  
                  <FaShoppingCart size={18} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Professional Cart Dropdown */}
                {isCartOpen && (
                  <div 
                    ref={cartDropdownRef}
                    className="smart-dropdown w-80 sm:w-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-[100]"
                    style={{
                      right: cartPosition.right,
                      left: cartPosition.left,
                      transform: cartPosition.transform,
                      marginRight: cartPosition.marginRight,
                      minWidth: '280px'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Elegant background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-purple-50/10 to-blue-50/20"></div>
                    
                    {/* Professional Cart Header */}
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-blue-50/30"></div>
                      
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center space-x-2">
                          <FaShoppingCart className="text-blue-600" size={20} />
                          <h3 className="font-bold text-blue-600">Shopping Cart</h3>
                        </div>
                        <span className="text-sm text-gray-600">{cartCount} items</span>
                      </div>
                    </div>
                    
                    {/* Cart Items */}
                    <div className="p-4 max-h-80 overflow-y-auto relative z-10">
                      {cartItems.length === 0 ? (
                        <div className="text-center py-8">
                          <FaShoppingCart className="mx-auto text-gray-300 mb-4" size={48} />
                          <p className="text-gray-500 mb-2">Your cart is empty</p>
                          <p className="text-gray-400 text-sm">Add some items to get started!</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                              <img 
                                src={item.image || '/assets/bims.jpg'} 
                                alt={item.name} 
                                className="w-12 h-12 rounded-lg object-cover" 
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                                <p className="text-gray-600 text-xs">{item.type || 'Digital License'}</p>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="font-bold text-blue-600">${item.price.toFixed(2)}</span>
                                  <div className="flex items-center space-x-1">
                                    <button 
                                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)} 
                                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                      <FaMinus size={10} />
                                    </button>
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs min-w-[24px] text-center">
                                      {item.quantity}
                                    </span>
                                    <button 
                                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                      className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                                    >
                                      <FaPlus size={10} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                title="Remove item"
                              >
                                <FaTrash size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Cart Footer */}
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-blue-50/30"></div>
                      
                      {cartItems.length > 0 && (
                        <>
                          <div className="flex items-center justify-between mb-3 relative z-10">
                            <span className="font-medium text-gray-700">Total:</span>
                            <span className="font-bold text-blue-600 text-lg">${cartTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex space-x-2 relative z-10">
                            <button 
                              onClick={clearCart}
                              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300"
                            >
                              Clear Cart
                            </button>
                            <button 
                              onClick={handleCheckout}
                              className="flex-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                              Checkout
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Professional Notification Button */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 overflow-hidden group border border-gray-200 hover:border-blue-300 hover:shadow-md"
                >
                  {/* Professional hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
                  {/* Elegant glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-100/40 to-purple-100/40 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                  
                  <FaBell size={18} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown - Smart positioning to stay within screen */}
                {isNotificationOpen && (
                  <div 
                    ref={notificationDropdownRef}
                    className="smart-dropdown w-80 sm:w-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-[100]"
                    style={{
                      right: notificationPosition.right,
                      left: notificationPosition.left,
                      transform: notificationPosition.transform,
                      marginRight: notificationPosition.marginRight,
                      minWidth: '280px'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-purple-50/20 to-blue-50/20"></div>
                    
                    {/* Notification Header */}
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-blue-50/30"></div>
                      
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center space-x-2">
                          <FaBell className="text-blue-600" size={18} />
                          <h3 className="font-bold text-blue-600">Notifications</h3>
                        </div>
                        <span className="text-sm text-gray-600">{notificationCount} new</span>
                      </div>
                    </div>
                    
                    {/* Notification Items */}
                    <div className="p-4 max-h-80 overflow-y-auto relative z-10">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 text-sm">New Software Update</h4>
                            <p className="text-gray-600 text-xs mt-1">Blast Designer Pro v2.1 is now available with new features.</p>
                            <span className="text-xs text-gray-500 mt-2 block">2 hours ago</span>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 text-sm">Order Completed</h4>
                            <p className="text-gray-600 text-xs mt-1">Your order #12345 has been successfully processed.</p>
                            <span className="text-xs text-gray-500 mt-2 block">1 day ago</span>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <div className="w-3 h-3 bg-orange-500 rounded-full mt-1 flex-shrink-0"></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 text-sm">Training Available</h4>
                            <p className="text-gray-600 text-xs mt-1">New mining safety training program is now available.</p>
                            <span className="text-xs text-gray-500 mt-2 block">3 days ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Notification Footer */}
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-blue-50/30"></div>
                      
                      <div className="flex space-x-2 relative z-10">
                        <button 
                          onClick={handleMarkAllRead}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300"
                        >
                          Mark All Read
                        </button>
                        <button 
                          onClick={handleViewAllNotifications}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          View All
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Section - Always visible */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Button effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                    
                    <div className="relative z-10">
                      <img
                        src={userProfile.avatar}
                        alt="Profile"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-gray-300 group-hover:border-blue-400 transition-all duration-300 shadow-md"
                      />
                      {isPremiumUser && (
                        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border border-white">
                          <FaCrown size={6} className="text-white" />
                        </div>
                      )}
                    </div>
                    <span className="hidden lg:block text-gray-700 group-hover:text-blue-600 font-medium text-sm truncate max-w-20 relative z-10">
                      {userProfile.name ? userProfile.name.split(' ')[0] : 'User'}
                    </span>
                    <FaChevronDown className="hidden lg:block text-xs text-gray-500 group-hover:text-blue-500 relative z-10 transition-all duration-300" />
                  </button>

                  {/* Profile Dropdown - Responsive positioning */}
                  {isProfileDropdownOpen && (
                    <div 
                      ref={profileDropdownRef}
                      className="smart-dropdown w-56 sm:w-64 md:w-72 lg:w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-[100]"
                      style={{
                        right: profilePosition.right,
                        left: profilePosition.left,
                        transform: profilePosition.transform,
                        marginRight: profilePosition.marginRight,
                        minWidth: '256px'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-purple-50/20 to-blue-50/20"></div>
                      
                      {/* Profile Header */}
                      <div className="p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-blue-50/30"></div>
                        
                        <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
                          <div className="relative">
                            <img
                              src={userProfile.avatar}
                              alt="Profile"
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border-2 border-blue-300 shadow-md"
                            />
                            {isPremiumUser && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                                <FaCrown size={8} className="text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold truncate text-blue-600 text-sm sm:text-base">{userProfile.name || 'User'}</h3>
                            <p className="text-gray-600 text-xs sm:text-sm truncate">{userProfile.email || 'No email'}</p>
                            <span className="inline-block mt-1 px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-xs border border-blue-200 text-blue-700">
                              {userProfile.role || 'User'}
                            </span>
                          </div>
                          
                          {/* Connection Status Indicator */}
                          <div className="hidden sm:flex flex-col items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 mt-1">Online</span>
                          </div>
                        </div>
                        
                        {/* Current Page Indicator */}
                        {isProfileRoute && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500">Current: <span className="font-medium text-blue-600">{getActiveProfileSection() || 'Profile'}</span></p>
                          </div>
                        )}
                      </div>

                      {/* Menu Items */}
                      <div className="p-2 sm:p-3 relative z-10">
                        {profileMenuItems.map((item, index) => {
                          const isActive = location.pathname === item.route;
                          const isPayment = item.highlight;
                          return (
                            <button
                              key={index}
                              onClick={(e) => {
                                console.log('Profile button clicked:', item.label);
                                e.preventDefault();
                                e.stopPropagation();
                                handleProfileNavigation(item);
                              }}
                              className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden group cursor-pointer mb-1 ${
                                isActive 
                                  ? isPayment
                                    ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                                    : 'text-blue-600 bg-blue-50 border border-blue-200'
                                  : isPayment
                                  ? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md'
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                              }`}
                            >
                              {/* Active indicator */}
                              {isActive && !isPayment && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r"></div>
                              )}
                              
                              {/* Item effect */}
                              <div className={`absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg ${
                                isActive && !isPayment ? 'opacity-30' : ''
                              }`}></div>

                              <item.icon size={14} className={`relative z-10 transition-colors duration-300 flex-shrink-0 ${
                                isPayment 
                                  ? 'text-white' 
                                  : isActive 
                                  ? 'text-blue-500' 
                                  : 'group-hover:text-blue-500'
                              }`} />
                              <div className="flex-1 text-left relative z-10 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <span className={`font-medium text-xs sm:text-sm truncate block ${
                                    isPayment
                                      ? 'text-white font-semibold'
                                      : isActive 
                                      ? 'text-blue-600 font-semibold' 
                                      : ''
                                  }`}>{item.label}</span>
                                  {isPayment && (
                                    <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">💳</span>
                                  )}
                                </div>
                                {item.description && (
                                  <p className={`text-xs mt-0.5 truncate hidden sm:block ${
                                    isPayment ? 'text-blue-100' : 'text-gray-500'
                                  }`}>{item.description}</p>
                                )}
                              </div>

                              {/* Active badge */}
                              {isActive && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full relative z-10 flex-shrink-0"></div>
                              )}

                              {/* Animated border */}
                              <div className={`absolute bottom-0 left-0 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300 ${
                                isActive ? 'w-full h-0.5' : 'w-0 h-0.5 group-hover:w-full'
                              }`}></div>
                            </button>
                          );
                        })}
                        
                        <div className="border-t border-gray-200 my-2"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 relative overflow-hidden group"
                        >
                          {/* Item effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                          
                          <FaSignOutAlt size={14} className="relative z-10" />
                          <span className="font-medium text-sm relative z-10">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {/* Sign In Button */}
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="flex items-center space-x-1 px-3 sm:px-4 py-2 sm:py-2.5 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-blue-50 font-medium text-xs sm:text-sm relative overflow-hidden group border border-gray-300 hover:border-blue-400 shadow-sm hover:shadow-md"
                  >
                    <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
                    
                    <FaSignInAlt size={14} className="relative z-10 group-hover:text-blue-600 transition-colors duration-300" />
                    <span className="hidden sm:block relative z-10 group-hover:font-semibold transition-all duration-300">Sign In</span>
                  </button>
                  
                  {/* Sign Up Button */}
                  <button
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="flex items-center space-x-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-medium text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.02] border-0 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                    
                    <FaUserPlus size={14} className="text-white relative z-10" />
                    <span className="hidden sm:block text-white font-semibold relative z-10">Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Responsive Search Bar */}
          {isSearchExpanded && (
            <div className="pb-3 px-2 sm:px-4">
              <div className="flex items-center bg-white rounded-lg px-3 py-2.5 border border-gray-300 shadow-sm">
                <FaSearch className="text-gray-500 mr-2 flex-shrink-0" size={14} />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm"
                  autoFocus
                />
                <button
                  onClick={startVoiceSearch}
                  className={`ml-2 p-1.5 rounded-lg transition-all duration-300 flex-shrink-0 ${
                    isVoiceSearch 
                      ? 'text-red-500 bg-red-50' 
                      : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {isVoiceSearch ? <FaMicrophoneSlash size={14} /> : <FaMicrophone size={14} />}
                </button>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 p-1 text-gray-400 hover:text-gray-600 rounded transition-colors duration-300"
                  >
                    <FaTimes size={12} />
                  </button>
                )}
              </div>
              
              {/* Search Suggestions */}
              {searchQuery && (
                <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                  {getSearchSuggestions(searchQuery).slice(0, 3).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 text-sm border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-2">
                        <FaSearch className="text-gray-400" size={10} />
                        <span>{suggestion}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Professional Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-lg border-t border-gray-200 shadow-lg">
            {/* Background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-purple-50/20 to-blue-50/20"></div>
            
            <div className="px-4 py-4 max-h-[70vh] overflow-y-auto relative z-10">
              
              {/* Professional Mobile Navigation */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider px-3 py-2 border-b border-gray-200">
                  Navigation
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.route}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-3 rounded-lg transition-all duration-300 font-medium relative overflow-hidden group border border-transparent hover:border-blue-200 shadow-sm hover:shadow-md ${
                      location.pathname === item.route
                        ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 shadow-md'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                    }`}
                  >
                    {/* Enhanced hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                    
                    <span className="relative z-10 group-hover:font-semibold transition-all duration-300">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* Advanced Professional Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Secure Checkout</h2>
                  <p className="text-blue-100 mt-1">Complete your purchase securely</p>
                </div>
                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="text-white hover:text-gray-200 text-2xl p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  ×
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-center mt-6 space-x-4">
                {[
                  { step: 1, label: 'Information' },
                  { step: 2, label: 'Address' },
                  { step: 3, label: 'Payment' },
                  { step: 4, label: 'Confirmation' }
                ].map((item, index) => (
                  <div key={item.step} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        checkoutStep >= item.step
                          ? 'bg-white text-blue-600'
                          : 'bg-blue-500/30 text-blue-200'
                      }`}
                    >
                      {orderConfirmed && item.step <= 4 ? '✓' : item.step}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      checkoutStep >= item.step ? 'text-white' : 'text-blue-200'
                    }`}>
                      {item.label}
                    </span>
                    {index < 3 && (
                      <div className={`w-8 h-0.5 mx-4 ${
                        checkoutStep > item.step ? 'bg-white' : 'bg-blue-500/30'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex">
              {/* Main Content */}
              <div className="flex-1 p-6 max-h-[60vh] overflow-y-auto">
                
                {/* Step 1: Customer Information */}
                {checkoutStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          value={checkoutForm.firstName}
                          onChange={(e) => handleFormChange('firstName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter first name"
                        />
                        {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          value={checkoutForm.lastName}
                          onChange={(e) => handleFormChange('lastName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter last name"
                        />
                        {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={checkoutForm.email}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter email address"
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          value={checkoutForm.phone}
                          onChange={(e) => handleFormChange('phone', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            formErrors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter phone number"
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
                        <input
                          type="text"
                          value={checkoutForm.company}
                          onChange={(e) => handleFormChange('company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter company name"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Address Information */}
                {checkoutStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Address Information</h3>
                    
                    {/* Billing Address */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-3">Billing Address</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                          <input
                            type="text"
                            value={checkoutForm.billingAddress}
                            onChange={(e) => handleFormChange('billingAddress', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              formErrors.billingAddress ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter street address"
                          />
                          {formErrors.billingAddress && <p className="text-red-500 text-xs mt-1">{formErrors.billingAddress}</p>}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                            <input
                              type="text"
                              value={checkoutForm.billingCity}
                              onChange={(e) => handleFormChange('billingCity', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.billingCity ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="City"
                            />
                            {formErrors.billingCity && <p className="text-red-500 text-xs mt-1">{formErrors.billingCity}</p>}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                            <input
                              type="text"
                              value={checkoutForm.billingState}
                              onChange={(e) => handleFormChange('billingState', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.billingState ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="State"
                            />
                            {formErrors.billingState && <p className="text-red-500 text-xs mt-1">{formErrors.billingState}</p>}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                            <input
                              type="text"
                              value={checkoutForm.billingZip}
                              onChange={(e) => handleFormChange('billingZip', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.billingZip ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="ZIP"
                            />
                            {formErrors.billingZip && <p className="text-red-500 text-xs mt-1">{formErrors.billingZip}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-700">Shipping Address</h4>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={checkoutForm.sameAsBilling}
                            onChange={(e) => handleFormChange('sameAsBilling', e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-600">Same as billing</span>
                        </label>
                      </div>
                      
                      {!checkoutForm.sameAsBilling && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                            <input
                              type="text"
                              value={checkoutForm.shippingAddress}
                              onChange={(e) => handleFormChange('shippingAddress', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.shippingAddress ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Enter street address"
                            />
                            {formErrors.shippingAddress && <p className="text-red-500 text-xs mt-1">{formErrors.shippingAddress}</p>}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                              <input
                                type="text"
                                value={checkoutForm.shippingCity}
                                onChange={(e) => handleFormChange('shippingCity', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                  formErrors.shippingCity ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="City"
                              />
                              {formErrors.shippingCity && <p className="text-red-500 text-xs mt-1">{formErrors.shippingCity}</p>}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                              <input
                                type="text"
                                value={checkoutForm.shippingState}
                                onChange={(e) => handleFormChange('shippingState', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                  formErrors.shippingState ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="State"
                              />
                              {formErrors.shippingState && <p className="text-red-500 text-xs mt-1">{formErrors.shippingState}</p>}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                              <input
                                type="text"
                                value={checkoutForm.shippingZip}
                                onChange={(e) => handleFormChange('shippingZip', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                  formErrors.shippingZip ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="ZIP"
                              />
                              {formErrors.shippingZip && <p className="text-red-500 text-xs mt-1">{formErrors.shippingZip}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Information */}
                {checkoutStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h3>
                    
                    {/* Payment Method Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { id: 'credit', label: 'Credit Card', icon: '💳' },
                          { id: 'paypal', label: 'PayPal', icon: '🏦' },
                          { id: 'upi', label: 'UPI', icon: '📱' }
                        ].map((method) => (
                          <label
                            key={method.id}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                              checkoutForm.paymentMethod === method.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={checkoutForm.paymentMethod === method.id}
                              onChange={(e) => handleFormChange('paymentMethod', e.target.value)}
                              className="mr-3"
                            />
                            <span className="text-xl mr-2">{method.icon}</span>
                            <span className="font-medium">{method.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Credit Card Form */}
                    {checkoutForm.paymentMethod === 'credit' && (
                      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                          <input
                            type="text"
                            value={checkoutForm.cardNumber}
                            onChange={(e) => {
                              const formatted = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                              handleFormChange('cardNumber', formatted);
                            }}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                          {formErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                            <input
                              type="text"
                              value={checkoutForm.expiryDate}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length >= 2) {
                                  value = value.substring(0, 2) + '/' + value.substring(2, 4);
                                }
                                handleFormChange('expiryDate', value);
                              }}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.expiryDate ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                            {formErrors.expiryDate && <p className="text-red-500 text-xs mt-1">{formErrors.expiryDate}</p>}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                            <input
                              type="text"
                              value={checkoutForm.cvv}
                              onChange={(e) => handleFormChange('cvv', e.target.value.replace(/\D/g, ''))}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                formErrors.cvv ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="123"
                              maxLength={4}
                            />
                            {formErrors.cvv && <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
                          <input
                            type="text"
                            value={checkoutForm.nameOnCard}
                            onChange={(e) => handleFormChange('nameOnCard', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              formErrors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="John Doe"
                          />
                          {formErrors.nameOnCard && <p className="text-red-500 text-xs mt-1">{formErrors.nameOnCard}</p>}
                        </div>
                      </div>
                    )}

                    {/* Order Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
                      <textarea
                        value={checkoutForm.orderNotes}
                        onChange={(e) => handleFormChange('orderNotes', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Special instructions for your order..."
                        rows={3}
                      />
                    </div>

                    {/* Terms and Newsletter */}
                    <div className="space-y-3">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          checked={checkoutForm.terms}
                          onChange={(e) => handleFormChange('terms', e.target.checked)}
                          className="mt-1 mr-3"
                        />
                        <span className="text-sm text-gray-700">
                          I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> *
                        </span>
                      </label>
                      {formErrors.terms && <p className="text-red-500 text-xs">{formErrors.terms}</p>}
                      
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          checked={checkoutForm.newsletter}
                          onChange={(e) => handleFormChange('newsletter', e.target.checked)}
                          className="mt-1 mr-3"
                        />
                        <span className="text-sm text-gray-700">
                          Subscribe to our newsletter for updates and offers
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 4: Order Confirmation */}
                {checkoutStep === 4 && (
                  <div className="text-center space-y-6">
                    {orderConfirmed ? (
                      <>
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <div className="text-4xl text-green-600">✓</div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h3>
                          <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been successfully processed.</p>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Order Number: <span className="font-mono font-bold">{'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()}</span></p>
                            <p className="text-sm text-gray-600 mt-1">You will receive an email confirmation shortly.</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">Processing Your Order...</h3>
                          <p className="text-gray-600">Please wait while we process your payment.</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="w-80 bg-gray-50 p-6 border-l">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium">${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">
                      {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-bold text-gray-800">Total:</span>
                    <span className="font-bold text-blue-600 text-lg">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="mt-6 space-y-3">
                  {checkoutStep < 4 && (
                    <button
                      onClick={checkoutStep === 3 ? processCheckout : nextStep}
                      disabled={isProcessing}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Processing...
                        </span>
                      ) : checkoutStep === 3 ? (
                        'Complete Order'
                      ) : (
                        'Continue'
                      )}
                    </button>
                  )}
                  
                  {checkoutStep > 1 && checkoutStep < 4 && !isProcessing && (
                    <button
                      onClick={prevStep}
                      className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  
                  {orderConfirmed && (
                    <button
                      onClick={() => setIsCheckoutModalOpen(false)}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Close
                    </button>
                  )}
                </div>

                {/* Security Badge */}
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <span className="mr-1">🔒</span>
                    <span>Secured by SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
