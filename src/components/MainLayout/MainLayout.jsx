import React, { useEffect } from 'react';
import useSound from 'use-sound';
import MainContent from '../content/main-content/MainContent';
import './MainLayout.scss';
import { useHistory } from 'react-router-dom';
import AppLoadedSound from '../../assets/sound/app_loads.mp3';

const MainLayout = () => {
  const {
    location: { pathname }
  } = useHistory();
  const [playAppStartedSound] = useSound(AppLoadedSound);

  useEffect(() => {
    if (pathname === '/') {
      playAppStartedSound();
    }
  }, [pathname]);
  return (
    <div className="main">
      <MainContent />
    </div>
  );
};

export default MainLayout;
