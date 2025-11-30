import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full p-6 z-50 pointer-events-none"
    >
      <div className="flex items-center justify-between pointer-events-auto">
        <svg 
          width="120" 
          height="40" 
          viewBox="0 0 120 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white select-none"
          aria-label="witee logo"
        >
          {/* Minimalist text logo for 'witee' */}
          <text x="0" y="30" fontSize="32" fontWeight="bold" fill="currentColor" letterSpacing="-1">
            witee
          </text>
          <circle cx="95" cy="12" r="4" fill="#3b82f6" />
        </svg>

        <button 
          className="p-2 text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
          aria-label="Open menu"
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>
    </motion.header>
  );
};

export default Header;