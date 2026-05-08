import axios from 'axios';
import { getMovies } from '../data/movies';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'dummy'; // In production, add your TMDB key to .env
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
});

const formatMovies = (results) => {
  return results.map(movie => ({
    id: movie.id,
    title: movie.title || movie.name || movie.original_name,
    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
    description: movie.overview,
    rating: movie.vote_average,
    releaseDate: movie.release_date || movie.first_air_date,
  }));
};

// Fallback logic
const handleRequest = async (endpoint) => {
  if (API_KEY === 'dummy') {
    console.warn("Using mock data. Please set VITE_TMDB_API_KEY in .env");
    return [...getMovies()].sort(() => 0.5 - Math.random());
  }
  
  try {
    const response = await tmdb.get(`${endpoint}&api_key=${API_KEY}`);
    return formatMovies(response.data.results);
  } catch (error) {
    console.error("TMDB API Error:", error);
    return [...getMovies()].sort(() => 0.5 - Math.random()); // Fallback on error
  }
};

export const fetchTrending = () => handleRequest('/trending/movie/week?language=en-US');
export const fetchTopRated = () => handleRequest('/movie/top_rated?language=en-US');
export const fetchActionMovies = () => handleRequest('/discover/movie?with_genres=28');
export const fetchComedyMovies = () => handleRequest('/discover/movie?with_genres=35');
export const fetchHorrorMovies = () => handleRequest('/discover/movie?with_genres=27');
export const searchMovies = async (query) => {
  if (!query) return [];
  if (API_KEY === 'dummy') {
    const mockData = getMovies();
    return mockData.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
  }
  try {
    const response = await tmdb.get(`/search/movie?query=${query}&api_key=${API_KEY}`);
    return formatMovies(response.data.results);
  } catch (error) {
    return [];
  }
};
