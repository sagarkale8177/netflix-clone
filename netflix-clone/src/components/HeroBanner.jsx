import React from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroBanner = ({ movie }) => {
  const title = movie?.title || "Stranger Things";
  const description = movie?.description || "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.";

  // Use movie's backdrop, or a fallback Stranger Things backdrop if not found
  const heroImage = movie?.backdrop || movie?.image || "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg";

  return (
    <div className="relative h-[80vh] w-full overflow-hidden group">
      <div className="absolute inset-0 bg-[#141414]">
        <img 
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent" />
      </div>
      
      <div className="relative h-full flex flex-col justify-center px-4 md:px-16 w-full">
        <motion.div 
          key={movie?.id} 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold drop-shadow-2xl text-white">{title}</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl drop-shadow-md line-clamp-3">
            {description}
          </p>
          <div className="flex gap-4 pt-4">
            <button className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded hover:bg-white/80 transition-all active:scale-95 font-semibold shadow-lg hover:shadow-xl">
              <Play className="w-5 h-5 fill-black" /> Play
            </button>
            <button className="flex items-center gap-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded hover:bg-gray-500/50 transition-all active:scale-95 font-semibold shadow-lg hover:shadow-xl">
              <Info className="w-5 h-5" /> More Info
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-[20%] right-0 flex items-center gap-2 z-20">
        <button 
          className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center bg-black/40 hover:bg-white/20 transition-colors mr-2 cursor-pointer"
        >
          <VolumeX className="w-5 h-5 text-white" />
        </button>
        <div className="bg-black/40 border-l-[3px] border-gray-300 px-4 py-2 flex items-center">
          <span className="text-white text-sm font-semibold">16+</span>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
