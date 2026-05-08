import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import TopTenRow from '../components/TopTenRow';
import Footer from '../components/Footer';
import MovieModal from '../components/MovieModal';
import { 
  fetchTrending, fetchTopRated, fetchActionMovies, 
  fetchComedyMovies, fetchHorrorMovies, searchMovies 
} from '../api/tmdb';

const Home = ({ profile }) => {
  const [movies, setMovies] = useState({
    trending: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: []
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const [trending, topRated, action, comedy, horror] = await Promise.all([
          fetchTrending(),
          fetchTopRated(),
          fetchActionMovies(),
          fetchComedyMovies(),
          fetchHorrorMovies()
        ]);
        setMovies({ trending, topRated, action, comedy, horror });
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-netflixRed"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar onSearch={setSearchQuery} profile={profile} />
      
      {isSearching ? (
        <div className="pt-32 px-4 md:px-16 min-h-screen">
          <h2 className="text-2xl font-bold text-gray-200 mb-8">Search Results for "{searchQuery}"</h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults.map(movie => (
                <div key={movie.id} onClick={() => handleMovieClick(movie)}>
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    className="w-full h-auto object-cover rounded-md cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No movies found.</p>
          )}
        </div>
      ) : (
        <>
          <HeroBanner movie={movies.trending[0]} />
          <div className="pb-10 -mt-20 md:-mt-32 relative z-10">
            <TopTenRow title={`Top 10 Movies in your Country Today`} movies={movies.topRated} onMovieClick={handleMovieClick} />
            <MovieRow title="Trending Now" movies={movies.trending} onMovieClick={handleMovieClick} />
            <MovieRow title="Action Movies" movies={movies.action} onMovieClick={handleMovieClick} />
            <MovieRow title="Comedy Movies" movies={movies.comedy} onMovieClick={handleMovieClick} />
            <MovieRow title="Horror Movies" movies={movies.horror} onMovieClick={handleMovieClick} />
          </div>
        </>
      )}

      <Footer />
      <MovieModal movie={selectedMovie} isOpen={!!selectedMovie} onClose={closeModal} />
    </div>
  );
};

export default Home;
