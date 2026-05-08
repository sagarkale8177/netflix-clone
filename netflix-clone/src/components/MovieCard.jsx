import React from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const MovieCard = ({ movie }) => {
  return (
    <div className="group relative w-48 md:w-64 flex-none cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10 origin-center hover:shadow-[0_8px_20px_rgba(0,0,0,0.8)]">
      <img 
        src={movie.image} 
        alt={movie.title}
        loading="lazy"
        className="w-full h-28 md:h-36 object-cover rounded-md"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
      <div className="absolute bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Play className="w-4 h-4 fill-black text-black ml-1" />
            </button>
            <button className="w-8 h-8 bg-black/50 border border-gray-400 rounded-full flex items-center justify-center hover:border-white hover:bg-black/70 transition-colors">
              <Plus className="w-4 h-4 text-white" />
            </button>
            <button className="w-8 h-8 bg-black/50 border border-gray-400 rounded-full flex items-center justify-center hover:border-white hover:bg-black/70 transition-colors">
              <ThumbsUp className="w-4 h-4 text-white" />
            </button>
          </div>
          <button className="w-8 h-8 bg-black/50 border border-gray-400 rounded-full flex items-center justify-center hover:border-white hover:bg-black/70 transition-colors">
            <ChevronDown className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-sm font-semibold">{movie.title}</p>
        <div className="flex items-center gap-2 text-xs text-green-500 font-semibold">
          <span>{Math.round((movie.rating || 9) * 10)}% Match</span>
          <span className="border border-gray-600 px-1 text-gray-300">16+</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
