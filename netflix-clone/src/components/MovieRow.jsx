import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="space-y-4 px-4 md:px-16 mt-8"
    >
      <h2 className="text-xl md:text-2xl font-bold text-gray-200 hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
        {title}
        <span className="text-netflixRed text-sm opacity-0 group-hover:opacity-100 transition-opacity font-medium mt-1">Explore All &gt;</span>
      </h2>
      <div className="relative group/row">
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-0 bottom-0 w-12 bg-black/50 hover:bg-black/80 text-white opacity-0 group-hover/row:opacity-100 transition-all z-20 flex items-center justify-center -ml-4 md:-ml-16 rounded-r-md backdrop-blur-sm"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <div 
          ref={rowRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth py-4"
        >
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => onMovieClick(movie)}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-0 bottom-0 w-12 bg-black/50 hover:bg-black/80 text-white opacity-0 group-hover/row:opacity-100 transition-all z-20 flex items-center justify-center -mr-4 md:-mr-16 rounded-l-md backdrop-blur-sm"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </motion.div>
  );
};

export default MovieRow;
