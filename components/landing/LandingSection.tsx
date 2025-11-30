import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../../types';
import { ArrowRight } from 'lucide-react';

interface LandingSectionProps {
  id: SectionId;
  title: string;
  description: string;
  ctaText: string;
  gradient: string;
  onClick: (id: SectionId) => void;
  index: number;
}

const LandingSection: React.FC<LandingSectionProps> = ({
  id,
  title,
  description,
  ctaText,
  gradient,
  onClick,
  index,
}) => {
  return (
    <motion.div
      className={`relative flex-1 flex flex-col justify-center items-center text-center p-8 md:p-12 cursor-pointer overflow-hidden group border-b md:border-b-0 border-white/10 ${index < 2 ? 'md:border-r' : ''}`}
      onClick={() => onClick(id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      {/* Background Gradient Effect on Hover */}
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${gradient}`}
      />
      
      {/* Content Container */}
      <div className="relative z-10 max-w-sm flex flex-col items-center gap-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          layoutId={`title-${id}`}
        >
          {title}
        </motion.h2>
        
        <motion.p 
          className="text-secondary text-lg leading-relaxed"
          layoutId={`desc-${id}`}
        >
          {description}
        </motion.p>

        <motion.button
          className="mt-4 px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium flex items-center gap-2 group-hover:bg-white group-hover:text-black transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {ctaText}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* Decorative background number */}
      <div className="absolute -bottom-10 -right-4 text-[12rem] font-bold text-white/5 select-none pointer-events-none">
        0{index + 1}
      </div>
    </motion.div>
  );
};

export default LandingSection;