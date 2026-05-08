import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TopTenRow = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  const top10 = movies.slice(0, 10);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="space-y-4 px-4 md:px-16 mt-8 relative z-20"
    >
      <h2 className="text-xl md:text-2xl font-bold text-gray-200 hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
        {title}
      </h2>
      <div className="relative group/row">
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-0 bottom-0 w-12 bg-black/50 hover:bg-black/80 text-white opacity-0 group-hover/row:opacity-100 transition-all z-30 flex items-center justify-center -ml-4 md:-ml-16 rounded-r-md backdrop-blur-sm"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <div 
          ref={rowRef}
          className="flex gap-4 md:gap-8 overflow-x-auto hide-scrollbar scroll-smooth py-4 pl-4 md:pl-12"
        >
          {top10.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => onMovieClick(movie)}
              className="relative flex-none w-[180px] md:w-[240px] h-[220px] md:h-[300px] cursor-pointer group transition-transform duration-300 hover:scale-105 hover:z-20 origin-bottom flex items-end justify-end"
            >
              <h1 
                className="absolute left-[-15px] md:left-[-20px] bottom-[-10px] md:bottom-[-20px] text-[150px] md:text-[220px] font-black leading-none tracking-tighter text-black z-0 drop-shadow-md select-none" 
                style={{ WebkitTextStroke: '3px white' }}
              >
                {index + 1}
              </h1>
              <div className="relative z-10 w-[110px] md:w-[150px] h-[165px] md:h-[225px] overflow-hidden rounded-md shadow-lg group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.8)] transition-all">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-0 bottom-0 w-12 bg-black/50 hover:bg-black/80 text-white opacity-0 group-hover/row:opacity-100 transition-all z-30 flex items-center justify-center -mr-4 md:-mr-16 rounded-l-md backdrop-blur-sm"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </motion.div>
  );
};

export default TopTenRow;
