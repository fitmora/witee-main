import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { title: 'Brand Story', subtitle: 'witee가 만들어가는 문화' },
    { title: 'Customer Support', subtitle: '궁금한 점을 해결해드려요' },
    { title: 'My Account', subtitle: '주문 내역 및 디자인 보관함' },
  ];

  return (
    <>
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
            className="text-white select-none cursor-pointer z-50"
            aria-label="witee logo"
            onClick={() => window.location.reload()}
          >
            <text x="0" y="30" fontSize="32" fontWeight="bold" fill="currentColor" letterSpacing="-1">
              witee
            </text>
            <circle cx="95" cy="12" r="4" fill="#3b82f6" />
          </svg>

          <button 
            onClick={toggleMenu}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 z-50 relative"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </motion.header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex items-center justify-center"
          >
            <div className="w-full max-w-lg px-6">
              <nav className="space-y-6">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href="#"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="block group"
                    onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); }}
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 group-hover:border-white/30 transition-colors">
                      <div>
                        <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-secondary text-sm mt-1">{item.subtitle}</p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-white/20 group-hover:text-white transition-colors" />
                    </div>
                  </motion.a>
                ))}
              </nav>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center"
              >
                <p className="text-secondary text-sm">© 2024 witee Inc. All rights reserved.</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;