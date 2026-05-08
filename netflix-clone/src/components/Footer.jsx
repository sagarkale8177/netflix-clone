import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const links = [
    'FAQ', 'Help Center', 'Account', 'Media Center',
    'Investor Relations', 'Jobs', 'Ways to Watch', 'Terms of Use',
    'Privacy', 'Cookie Preferences', 'Corporate Information', 'Contact Us',
    'Speed Test', 'Legal Notices', 'Only on Netflix'
  ];

  return (
    <footer className="mt-20 px-4 md:px-16 py-10 text-gray-500 max-w-5xl mx-auto">
      <div className="flex gap-6 mb-6">
        <FaFacebookF className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
        <FaInstagram className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
        <FaTwitter className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
        <FaYoutube className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {links.map((link, idx) => (
          <a key={idx} href="#" className="text-sm hover:underline transition-colors">
            {link}
          </a>
        ))}
      </div>
      
      <button className="border border-gray-500 text-gray-400 px-4 py-2 text-sm hover:text-white hover:border-white transition-colors mb-4">
        Service Code
      </button>
      
      <p className="text-xs">© 1997-2024 Netflix, Inc.</p>
    </footer>
  );
};

export default Footer;
