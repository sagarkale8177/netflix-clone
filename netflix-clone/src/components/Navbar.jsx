import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';

const Navbar = ({ onSearch, profile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchClick = () => {
    setSearchExpanded(!searchExpanded);
    if (!searchExpanded) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchValue('');
      onSearch?.('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearch?.(e.target.value);
  };

  const navLinks = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'];

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="px-4 md:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-netflixRed text-2xl md:text-3xl font-bold tracking-wider cursor-pointer">NETFLIX</h1>
          <ul className="hidden md:flex gap-4 text-sm font-medium text-gray-300">
            {navLinks.map((link, idx) => (
              <li key={idx} className={`cursor-pointer transition-colors ${idx === 0 ? 'text-white' : 'hover:text-white'}`}>
                {link}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6 text-gray-300">
          <div className="flex items-center border border-transparent transition-all duration-300 overflow-hidden" 
               style={{ borderColor: searchExpanded ? 'white' : 'transparent', backgroundColor: searchExpanded ? 'rgba(0,0,0,0.5)' : 'transparent', padding: searchExpanded ? '2px 8px' : '0' }}>
            <Search className="w-5 h-5 cursor-pointer hover:text-white transition-colors" onClick={handleSearchClick} />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Titles, people, genres" 
              value={searchValue}
              onChange={handleSearchChange}
              className={`bg-transparent text-sm text-white focus:outline-none transition-all duration-300 ${searchExpanded ? 'w-32 md:w-48 ml-2 opacity-100' : 'w-0 ml-0 opacity-0'}`}
            />
          </div>
          
          <p className="hidden md:block text-sm cursor-pointer hover:text-white transition-colors">Children</p>
          <Bell className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          {/* User Profile */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded overflow-hidden">
              {profile ? (
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="hidden md:block transition-transform duration-300 group-hover:rotate-180">
              <User className="w-4 h-4 opacity-0" /> {/* Spacer */}
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white ml-1"></div>
            </div>
          </div>
          
          {/* Mobile Hamburger Menu Icon */}
          <div className="md:hidden flex items-center" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 cursor-pointer text-white" />
            ) : (
              <Menu className="w-6 h-6 cursor-pointer text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-t border-gray-800">
          <ul className="flex flex-col px-4 py-4 space-y-4 text-sm font-medium text-gray-300">
            {navLinks.map((link, idx) => (
              <li 
                key={idx} 
                className={`cursor-pointer transition-colors ${idx === 0 ? 'text-white' : 'hover:text-white'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
