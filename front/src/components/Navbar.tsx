import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, BookOpen, User, UserCircle, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isLoggedIn, checkLoginStatus } = useAuth();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    setUserType(null);
    checkLoginStatus();
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-600 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/volleyball.svg" alt="VolleyMentor" className="h-8 w-8" />
              <span className="text-xl font-bold">VolleyMentor</span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <Home className="h-5 w-5 mr-1" />
                Home
              </Link>
              <Link to="/courses" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <BookOpen className="h-5 w-5 mr-1" />
                Courses
              </Link>
              <Link to="/contact" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <User className="h-5 w-5 mr-1" />
                Contact Us
              </Link>
              {isLoggedIn && userType === 'Professeur' && (
                <Link to="/admin" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <Settings className="h-5 w-5 mr-1" />
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block relative">
            {isLoggedIn ? (
              <div>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hover:bg-blue-700 p-2 rounded-md text-sm font-medium flex items-center"
                >
                  <UserCircle className={`h-6 w-6 ${isLoggedIn ? 'text-green-400' : ''}`} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {userType === 'professeur' && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hover:bg-blue-700 p-2 rounded-md text-sm font-medium flex items-center">
                <UserCircle className="h-6 w-6" />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Home
            </Link>
            <Link to="/courses" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Courses
            </Link>
            <Link to="/contact" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium flex items-center">
              <User className="h-5 w-5 mr-2" />
              Contact Us
            </Link>
            {isLoggedIn && userType === 'professeur' && (
              <Link to="/admin" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Admin
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium flex items-center">
                <UserCircle className="h-5 w-5 mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 