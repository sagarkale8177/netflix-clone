import React from 'react';
import { motion } from 'framer-motion';

const profiles = [
  { name: 'User 1', avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' },
  { name: 'Kids', avatar: 'https://pro2-bar-s3-cdn-cf.myportfolio.com/dddb0c1b4ab622854dd81280840458d3/877ad1ce3a479ef9498e1efc_rw_600.png?h=794db6a6ae01c539fdfb7ad5e5a89589' },
  { name: 'Guest', avatar: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg' },
];

const ProfileSelect = ({ onSelectProfile }) => {
  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center pt-20">
      <div className="absolute top-0 left-0 p-4 md:p-8">
        <h1 className="text-netflixRed text-3xl md:text-5xl font-bold tracking-wider">NETFLIX</h1>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <h2 className="text-white text-3xl md:text-5xl mb-10 font-medium text-center">Who's watching?</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl px-4">
          {profiles.map((profile, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              onClick={() => onSelectProfile(profile)}
              className="group flex flex-col items-center cursor-pointer w-24 md:w-36"
            >
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-300">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-gray-400 group-hover:text-white mt-4 text-sm md:text-lg transition-colors duration-300">
                {profile.name}
              </p>
            </motion.div>
          ))}
        </div>
        <button className="mt-16 border border-gray-500 text-gray-500 px-6 py-2 text-sm md:text-xl hover:text-white hover:border-white transition-colors duration-300 tracking-widest">
          MANAGE PROFILES
        </button>
      </motion.div>
    </div>
  );
};

export default ProfileSelect;
