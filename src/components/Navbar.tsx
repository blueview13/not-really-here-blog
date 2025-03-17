
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

const categories = [
  { name: 'Latest News', path: '/category/latest-news' },
  { name: 'Match Reports', path: '/category/match-reports' },
  { name: 'Match Previews', path: '/category/match-previews' },
  { name: 'Transfer News', path: '/category/transfer-news' },
  { name: 'Features', path: '/category/features' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (searchOpen) setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Would handle search logic here
    console.log('Searching for:', searchQuery);
    setSearchOpen(false);
    setSearchQuery('');
    // Navigate to search results page
  };

  const navbarClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
  );

  return (
    <nav className={navbarClasses}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            aria-label="Not Really Here Blog Homepage"
          >
            <span className="text-2xl font-bold text-city-navy">
              Not <span className="text-city-sky">Really</span> Here
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className={cn(
                  'nav-link',
                  location.pathname === category.path ? 'active' : ''
                )}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {isAuthenticated ? (
              <Link
                to="/admin"
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Admin Dashboard"
              >
                <User size={20} />
                <span className="hidden sm:inline text-sm">Admin</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Login"
              >
                <User size={20} />
                <span className="hidden sm:inline text-sm">Login</span>
              </Link>
            )}

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="pt-2 pb-4 space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className={cn(
                    'block px-3 py-2 rounded-md text-base font-medium',
                    location.pathname === category.path
                      ? 'bg-city-sky/10 text-city-navy'
                      : 'hover:bg-gray-50'
                  )}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Overlay */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 animate-fade-in">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-city-sky focus:border-transparent"
                autoFocus
              />
              <button
                type="submit"
                className="bg-city-sky text-white p-2 rounded-r-md hover:bg-city-sky/90 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
