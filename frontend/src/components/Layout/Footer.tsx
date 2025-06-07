import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Bookmark className="h-6 w-6 text-white" />
              <span className="ml-2 text-xl font-semibold">ScholarHub</span>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting students with scholarship opportunities to help them achieve their educational goals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">SCHOLARSHIPS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/scholarships" className="text-gray-300 hover:text-white">
                  Browse All
                </Link>
              </li>
              <li>
                <Link to="/scholarships/undergraduate" className="text-gray-300 hover:text-white">
                  For Undergraduate
                </Link>
              </li>
              <li>
                <Link to="/scholarships/graduate" className="text-gray-300 hover:text-white">
                  For Graduate
                </Link>
              </li>
              <li>
                <Link to="/scholarships/international" className="text-gray-300 hover:text-white">
                  International
                </Link>
              </li>
              <li>
                <Link to="/scholarships/merit-based" className="text-gray-300 hover:text-white">
                  Merit-Based
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>© 2025 ScholarHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;