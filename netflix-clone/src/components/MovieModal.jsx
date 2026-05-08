import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Plus, ThumbsUp } from 'lucide-react';

const MovieModal = ({ movie, isOpen, onClose }) => {
  if (!movie) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 top-[5vh] left-[5vw] right-[5vw] md:top-[10vh] md:left-[20vw] md:right-[20vw] bg-[#181818] rounded-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto hide-scrollbar"
          >
            <div className="relative h-64 md:h-96 w-full">
              <img
                src={movie.backdrop || movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-[#181818] rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">{movie.title}</h2>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded hover:bg-white/80 transition-all font-semibold">
                    <Play className="w-5 h-5 fill-black" /> Play
                  </button>
                  <button className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white hover:bg-white/20 transition-all">
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                  <button className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white hover:bg-white/20 transition-all">
                    <ThumbsUp className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-8 text-white grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-4 text-sm font-semibold">
                  <span className="text-green-500">{Math.round((movie.rating || 9) * 10)}% Match</span>
                  <span>{movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : '2024'}</span>
                  <span className="border px-1 text-gray-300">HD</span>
                </div>
                <p className="text-lg leading-relaxed">{movie.description || 'A brilliant description of this movie. It explores themes of adventure and mystery, keeping viewers on the edge of their seats from start to finish.'}</p>
              </div>
              <div className="text-sm text-gray-400 space-y-4">
                <p><span className="text-gray-600">Cast:</span> Awesome Actor, Great Actress, Some Guy</p>
                <p><span className="text-gray-600">Genres:</span> Action, Drama, Thriller</p>
                <p><span className="text-gray-600">This show is:</span> Exciting, Suspenseful</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MovieModal;
