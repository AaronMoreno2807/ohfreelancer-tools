
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-oh-primary text-white pt-16 pb-8">
      <div className="oh-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center mr-2 bg-white rounded-full">
                <img 
                  src="/lovable-uploads/5aa96ccb-a325-426d-8ba4-dac5f7e0c0ef.png" 
                  alt="OhFreelancers Logo" 
                  className="w-7 h-7 object-contain"
                />
              </div>
              <span className="text-xl font-display font-semibold tracking-tight">
                OhFreelancers
              </span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              Empowering freelancers to manage administrative tasks efficiently while focusing on their expertise.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="transition-opacity hover:opacity-80">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="transition-opacity hover:opacity-80">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.04 10.04 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="transition-opacity hover:opacity-80">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.374 0 0 5.374 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="transition-opacity hover:opacity-80">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-white/80 hover:text-white flex items-center transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  <span>Our Services</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white flex items-center transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white/80 hover:text-white flex items-center transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  <span>Register</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white/80 hover:text-white flex items-center transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/80 hover:text-white flex items-center transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  <span>FAQ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-white/80 hover:text-white flex items-center transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/80 hover:text-white flex items-center transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/legal-notice" className="text-white/80 hover:text-white flex items-center transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  <span>Legal Notice</span>
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-white/80 hover:text-white flex items-center transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  <span>Cookie Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-white/80 text-sm">
              Have questions or need assistance? Our support team is ready to help.
            </p>
            <div className="space-y-2">
              <a href="mailto:support@ohfreelancers.com" className="text-white/80 hover:text-white flex items-center transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@ohfreelancers.com</span>
              </a>
              <a href="tel:+1-800-123-4567" className="text-white/80 hover:text-white flex items-center transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                <span>+1-800-123-4567</span>
              </a>
            </div>
            <div className="oh-button-outline text-white border-white/20 hover:bg-white/10 cursor-pointer text-center">
              Contact Support
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/70">
            &copy; {currentYear} OhFreelancers. All rights reserved. <span className="hidden sm:inline">SBETTER CALLAI LLC.</span>
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Link to="/terms" className="text-sm text-white/70 hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-white/70 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/legal" className="text-sm text-white/70 hover:text-white transition-colors">
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
