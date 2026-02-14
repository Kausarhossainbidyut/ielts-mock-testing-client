import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          confirmButtonColor: '#3085d6'
        });
        navigate('/');
      }
    });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Tests', path: '/tests' },
    { name: 'Tips & Strategies', path: '/tips' },
    { name: 'Resources', path: '/resources' }
  ];

  const practiceLinks = [
    { name: 'Listening', path: '/listening' },
    { name: 'Reading', path: '/reading' },
    { name: 'Writing', path: '/writing' },
    { name: 'Speaking', path: '/speaking' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              {/* Professional Logo Icon with Glow Effect */}
              <div className="relative w-11 h-11">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                {/* Main icon */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-white font-bold text-[10px] leading-none">IELTS</span>
                  </div>
                </div>
                {/* Shine effect */}
                <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-white opacity-20 rounded-tl-xl rounded-tr-sm"></div>
              </div>
              {/* Logo Text */}
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-gray-800 leading-tight tracking-tight">
                  IELTS Smart
                </span>
                <span className="text-[10px] font-bold text-blue-500 tracking-[0.25em] uppercase">
                  Practice
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Practice Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center">
                Practice
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {practiceLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-3">
                {/* User Avatar */}
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
                {/* User Name */}
                <span className="text-sm text-gray-700">
                  <span className="font-medium">{user.name || user.email?.split('@')[0]}</span>
                </span>
                {/* Dashboard Link - Compact */}
                <Link
                  to="/dashboard"
                  className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                {/* Logout Button - Compact */}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/registration"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Practice Dropdown */}
            <div className="pt-2">
              <button
                onClick={() => setIsPracticeOpen(!isPracticeOpen)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <span>Practice</span>
                <svg className={`ml-1 h-4 w-4 transform transition-transform ${isPracticeOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isPracticeOpen && (
                <div className="pl-4 mt-2 space-y-1">
                  {practiceLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-3 border-t border-gray-100 mt-3">
              {user ? (
                <div className="space-y-2">
                  {/* User Info Row */}
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name || user.email}</span>
                  </div>
                  {/* Dashboard & Logout Row */}
                  <div className="flex gap-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex-1 px-3 py-2 text-center text-sm font-medium text-blue-600 bg-blue-50 rounded-lg"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex-1 px-3 py-2 text-center text-sm font-medium text-red-600 bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 text-center text-sm font-medium text-gray-600 bg-gray-50 rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/registration"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 text-center text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;