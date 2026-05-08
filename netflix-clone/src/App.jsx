import React, { useState } from 'react';
import Home from './pages/Home';
import ProfileSelect from './components/ProfileSelect';

function App() {
  const [activeProfile, setActiveProfile] = useState(null);

  if (!activeProfile) {
    return <ProfileSelect onSelectProfile={setActiveProfile} />;
  }

  return (
    <Home profile={activeProfile} />
  );
}

export default App;
