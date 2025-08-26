import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaChevronDown, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaSearch, FaUser, FaHeart } from 'react-icons/fa';

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
    hasDropdown: true,
    dropdownItems: [
      { name: 'Mining Consultancy', route: '/mining-consultancy' },
      { name: 'Software Development', route: '/software-development' },
      { name: 'Training Programs', route: '/training-programs' },
      { name: 'Environmental Assessment', route: '/environmental-assessment' },
    ]
  },
  { 
    name: 'Software', 
    route: '/software',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Blast Designer', route: '/software/blast-designer-surface' },
      { name: 'Pattern Analyser', route: '/software/pattern-analyser' },
      { name: 'Flyrock Prediction', route: '/software/flyrock-prediction' },
      { name: 'Fragmentation Predictor', route: '/software/fragmentation-predictor' },
    ]
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
  },
  { 
    name: 'Contact', 
    route: '/contact',
    hasDropdown: false
  }
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <>
      {/* Professional Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-2 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaPhone size={12} />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope size={12} />
                <span>info@earthresource.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt size={12} />
                <span>Raipur, Chhattisgarh, India</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock size={12} />
              <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Badge */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-pulse text-sm font-semibold text-center">
              ✨ Innovation in Mining Technology
            </div>
          </div>
        </div>
      </div>

      {/* Main Professional Header */}
      <header className={`w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'shadow-2xl border-b border-orange-200/50 bg-white/98' 
          : 'shadow-lg border-b border-gray-100/50'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-orange-50/30"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
            
            {/* Professional Logo Section */}
            <div className="flex-shrink-0 w-80">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className={`w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 ${
                    isScrolled ? 'logo-glow' : ''
                  }`}>
                    <span className="text-white font-bold text-lg font-mono">ERT</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse">
                    <div className="w-1 h-1 bg-white rounded-full mx-auto mt-1"></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl xl:text-2xl font-black bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent leading-tight">
                    Earth Resource
                  </span>
                  <span className="text-base xl:text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent leading-tight -mt-1">
                    Technology
                  </span>
                </div>
              </Link>
            </div>

            {/* Professional Navigation with Card Design */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200/50">
                <div className="flex items-center space-x-1">
                  {navItems.map((item) => (
                    <div key={item.route} className="relative">
                      {item.hasDropdown ? (
                        <div className="relative">
                          <button
                            className={`flex items-center space-x-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group ${
                              location.pathname === item.route || location.pathname.startsWith(item.route + '/')
                                ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md'
                                : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500'
                            }`}
                            onMouseEnter={() => setActiveDropdown(item.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                          >
                            <span className="relative z-10">{item.name}</span>
                            <FaChevronDown size={10} className={`relative z-10 transition-all duration-300 ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`} />
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                          </button>
                          
                          {/* Professional Dropdown */}
                          <div
                            className={`absolute top-full left-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden transition-all duration-300 transform ${
                              activeDropdown === item.name 
                                ? 'opacity-100 visible translate-y-0 scale-100' 
                                : 'opacity-0 invisible -translate-y-4 scale-95'
                            }`}
                            onMouseEnter={() => setActiveDropdown(item.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                          >
                            <div className="p-3 space-y-1">
                              {item.dropdownItems?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.route}
                                  to={dropdownItem.route}
                                  className="block p-4 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all duration-300 font-medium group"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                                    <span>{dropdownItem.name}</span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={item.route}
                          className={`block px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group ${
                            location.pathname === item.route
                              ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md'
                              : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500'
                          }`}
                        >
                          <span className="relative z-10">{item.name}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </nav>

            {/* Professional Action Buttons */}
            <div className="hidden lg:flex items-center justify-end space-x-4 w-80">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-md border border-gray-200/50">
                <button className="relative p-3 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all duration-300 transform hover:scale-110 group">
                  <FaSearch size={16} />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </button>

                <button className="relative p-3 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 rounded-lg transition-all duration-300 transform hover:scale-110 group">
                  <FaHeart size={16} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">2</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </button>

                <button className="relative p-3 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 rounded-lg transition-all duration-300 transform hover:scale-110 group">
                  <FaShoppingCart size={16} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">{cartCount}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </button>

                <button className="relative p-3 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 rounded-lg transition-all duration-300 transform hover:scale-110 group">
                  <FaUser size={16} />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </button>
              </div>

              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all duration-300 transform hover:scale-110"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <FaTimes size={20} />
              ) : (
                <FaBars size={20} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Professional Mobile Menu */}
      <div className={`lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200/50 transition-all duration-500 transform ${
        isMobileMenuOpen 
          ? 'max-h-screen opacity-100 translate-y-0' 
          : 'max-h-0 opacity-0 -translate-y-4 overflow-hidden'
      }`}>
        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <div key={item.route} className="space-y-2">
                {item.hasDropdown ? (
                  <>
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3 text-left font-semibold rounded-lg transition-all duration-300 ${
                        location.pathname === item.route || location.pathname.startsWith(item.route + '/')
                          ? 'text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-md'
                          : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500'
                      }`}
                      onClick={() => handleDropdownToggle(item.name)}
                    >
                      <span>{item.name}</span>
                      <FaChevronDown size={10} className={`transition-all duration-300 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {activeDropdown === item.name && (
                      <div className="ml-4 space-y-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.route}
                            to={dropdownItem.route}
                            className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 rounded-lg transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.route}
                    className={`block px-4 py-3 font-semibold rounded-lg transition-all duration-300 ${
                      location.pathname === item.route
                        ? 'text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-md'
                        : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Actions */}
            <div className="pt-4 border-t border-gray-200/50 space-y-3">
              <div className="grid grid-cols-4 gap-3">
                <button className="flex flex-col items-center justify-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all duration-300">
                  <FaSearch size={16} className="mb-1" />
                  <span className="text-xs font-medium">Search</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-br hover:from-pink-500 hover:to-red-500 rounded-lg transition-all duration-300 relative">
                  <FaHeart size={16} className="mb-1" />
                  <span className="text-xs font-medium">Wishlist</span>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-br hover:from-green-500 hover:to-emerald-500 rounded-lg transition-all duration-300 relative">
                  <FaShoppingCart size={16} className="mb-1" />
                  <span className="text-xs font-medium">Cart</span>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">{cartCount}</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-3 text-gray-700 hover:text-white hover:bg-gradient-to-br hover:from-indigo-500 hover:to-blue-500 rounded-lg transition-all duration-300">
                  <FaUser size={16} className="mb-1" />
                  <span className="text-xs font-medium">Profile</span>
                </button>
              </div>
              
              <button
                onClick={() => {
                  navigate('/register');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md"
              >
                Register Now
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;