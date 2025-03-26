
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LanguageToggle from '../ui/LanguageToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Check if current route is active
  const isActiveRoute = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="oh-container flex items-center justify-between">
        <Link 
          to="/" 
          className="relative group flex items-center"
          aria-label="OhFreelancers Home"
        >
          <div className="w-10 h-10 flex items-center justify-center mr-2 relative overflow-hidden">
            <img 
              src="/lovable-uploads/5aa96ccb-a325-426d-8ba4-dac5f7e0c0ef.png" 
              alt="OhFreelancers Logo" 
              className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-oh-accent/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
          </div>
          <span className="text-xl font-display font-semibold tracking-tight">
            OhFreelancers
            <span className="text-oh-accent">.</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActiveRoute('/') ? 'text-oh-accent' : 'text-oh-muted-text hover:text-oh-text'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/services" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActiveRoute('/services') ? 'text-oh-accent' : 'text-oh-muted-text hover:text-oh-text'
            }`}
          >
            Services
          </Link>
          <Link 
            to="/about" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActiveRoute('/about') ? 'text-oh-accent' : 'text-oh-muted-text hover:text-oh-text'
            }`}
          >
            About
          </Link>
          <LanguageToggle />
          <div className="h-6 w-px bg-oh-border mx-2" />
          <Link 
            to="/login" 
            className="oh-button-outline text-sm px-4 py-2"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="oh-button-primary text-sm px-4 py-2"
          >
            Register
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="ml-2 p-2 rounded-lg text-oh-muted-text hover:text-oh-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div 
        className={`
          fixed inset-0 bg-white/95 backdrop-blur-lg z-40 pt-20 px-4 transition-all duration-300 transform md:hidden
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <nav className="flex flex-col space-y-3">
          <Link 
            to="/" 
            className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
              isActiveRoute('/') ? 'bg-oh-border/50 text-oh-text' : 'text-oh-muted-text'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/services" 
            className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
              isActiveRoute('/services') ? 'bg-oh-border/50 text-oh-text' : 'text-oh-muted-text'
            }`}
          >
            Services
          </Link>
          <Link 
            to="/about" 
            className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
              isActiveRoute('/about') ? 'bg-oh-border/50 text-oh-text' : 'text-oh-muted-text'
            }`}
          >
            About
          </Link>
          <div className="oh-divider" />
          <Link 
            to="/login" 
            className="oh-button-outline w-full text-center"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="oh-button-primary w-full text-center"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
