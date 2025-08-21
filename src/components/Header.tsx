import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaRocket, FaCog } from 'react-icons/fa';

const navItems = [
  { name: 'Home', route: '/', icon: '🏠' },
  { name: 'About Us', route: '/about', icon: '🌟' },
  { name: 'Services', route: '/services', icon: '⚡' },
  { name: 'Gallery', route: '/gallery', icon: '🖼️' },
  { name: 'People', route: '/people', icon: '👥' },
  { name: 'Contact Us', route: '/contact', icon: '📞' },
  { name: 'Library', route: '/library', icon: '📚' },
  { name: 'Software', route: '/software', icon: '💻' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [arrowPosition, setArrowPosition] = useState(0);

  // Find current active index and set arrow position
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.route === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
      // Calculate arrow position based on nav item width and spacing
      const navItemWidth = 140; // Approximate width including padding and margin
      setArrowPosition(currentIndex * navItemWidth + (navItemWidth / 2));
    }
  }, [location.pathname]);

  return (
    <header className="w-full relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950">
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Glowing border effects */}
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-60"></div>
      </div>

      {/* Main Header Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        {/* Enhanced Logo with Animation */}
        <Link 
          to="/" 
          className="flex items-center space-x-3 group transform transition-all duration-500 hover:scale-105"
        >
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl group-hover:shadow-cyan-400/50 transition-all duration-300 group-hover:rotate-12">
              <FaRocket className="text-white text-xl group-hover:animate-bounce" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 font-['Orbitron'] tracking-wide group-hover:from-cyan-200 group-hover:to-purple-200 transition-all duration-300">
              EARTH RESOURCE
            </span>
            <span className="text-sm font-semibold text-blue-300 font-['Orbitron'] tracking-widest group-hover:text-cyan-300 transition-colors duration-300">
              TECHNOLOGY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with Advanced Effects */}
        <nav className="hidden lg:flex relative">
          {/* Animated Navigation Container */}
          <div className="relative bg-gradient-to-r from-slate-800/80 via-blue-900/80 to-slate-800/80 rounded-2xl px-4 py-3 backdrop-blur-md border border-cyan-400/30 shadow-2xl">
            {/* Dynamic Neon Arrow */}
            <div 
              className="absolute top-0 h-full w-8 transition-all duration-700 ease-out"
              style={{ 
                left: `${arrowPosition - 16}px`,
                transform: 'translateX(-50%)'
              }}
            >
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-cyan-400 mx-auto animate-pulse shadow-lg shadow-cyan-400/50"></div>
              <div className="w-1 h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 mx-auto shadow-lg shadow-cyan-400/50 animate-pulse"></div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-cyan-400 mx-auto animate-pulse shadow-lg shadow-cyan-400/50"></div>
            </div>

            {/* Navigation Items */}
            <div className="flex space-x-2 relative z-10">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.route;
                return (
                  <Link
                    key={item.route}
                    to={item.route}
                    onMouseEnter={() => {
                      const navItemWidth = 140;
                      setArrowPosition(index * navItemWidth + (navItemWidth / 2));
                    }}
                    onMouseLeave={() => {
                      const navItemWidth = 140;
                      setArrowPosition(activeIndex * navItemWidth + (navItemWidth / 2));
                    }}
                    className={`
                      relative group px-4 py-3 rounded-xl transition-all duration-300 font-['Orbitron'] font-semibold text-sm tracking-wide min-w-[130px] text-center
                      ${isActive 
                        ? 'text-cyan-300 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 shadow-lg shadow-cyan-400/30' 
                        : 'text-gray-300 hover:text-cyan-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10'
                      }
                    `}
                  >
                    {/* Background glow effect */}
                    <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-cyan-400/10 to-blue-400/10 blur-sm' : 'group-hover:bg-gradient-to-r group-hover:from-cyan-400/5 group-hover:to-blue-400/5'}`}></div>
                    
                    {/* Icon and text */}
                    <div className="relative flex items-center justify-center space-x-2">
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>

                    {/* Hover effect particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${Math.random() * 2}s`
                          }}
                        />
                      ))}
                    </div>

                    {/* Bottom glow line for active state */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden relative z-50 p-3 rounded-xl bg-gradient-to-r from-slate-700 to-blue-700 text-white hover:from-slate-600 hover:to-blue-600 transition-all duration-300 hover:scale-110 shadow-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </div>
        </button>

        {/* Enhanced Right Side Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Settings button */}
          <button className="relative group p-3 rounded-xl bg-gradient-to-r from-slate-700/80 to-purple-700/80 hover:from-slate-600 hover:to-purple-600 text-white transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm">
            <FaCog className="text-lg group-hover:rotate-90 transition-transform duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </button>

          {/* Cart button */}
          <button className="relative group p-3 rounded-xl bg-gradient-to-r from-slate-700/80 to-blue-700/80 hover:from-slate-600 hover:to-blue-600 text-white transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm">
            <FaShoppingCart className="text-lg" />
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">3</div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </button>

          {/* Register button */}
          <button
            onClick={() => navigate('/register')}
            className="relative group px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold transition-all duration-300 hover:scale-105 shadow-2xl font-['Orbitron'] tracking-wide overflow-hidden"
          >
            <span className="relative z-10">REGISTER</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <nav
          className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 transform transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } border-l border-cyan-400/30 shadow-2xl overflow-hidden`}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          {/* Menu Header */}
          <div className="relative p-6 border-b border-cyan-400/30">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 font-['Orbitron']">
              NAVIGATION
            </h2>
          </div>

          {/* Menu Items */}
          <div className="relative p-6 space-y-4">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.route;
              return (
                <Link
                  key={item.route}
                  to={item.route}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    relative group flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 font-['Orbitron'] font-semibold
                    ${isActive 
                      ? 'text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30' 
                      : 'text-gray-300 hover:text-cyan-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:border hover:border-cyan-400/20'
                    }
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-lg">{item.name}</span>
                  
                  {isActive && (
                    <div className="absolute right-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              );
            })}

            {/* Mobile Action Buttons */}
            <div className="pt-6 space-y-4 border-t border-cyan-400/20">
              <button className="w-full flex items-center justify-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-slate-700 to-blue-700 hover:from-slate-600 hover:to-blue-600 text-white transition-all duration-300 font-['Orbitron'] font-semibold">
                <FaShoppingCart />
                <span>CART (3)</span>
              </button>
              
              <button
                onClick={() => {
                  navigate('/register');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold transition-all duration-300 font-['Orbitron'] tracking-wide"
              >
                REGISTER NOW
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 