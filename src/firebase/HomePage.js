import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import AppHeader from '../components/AppHeader';
import { PageTitle, Subtitle, Name } from '../components/PageTitle';
import styles from '../styles/modules/app.module.scss';
import AppContent from '../components/AppContent';
import Profile from './Profile';
import LogoutPage from './LogoutPage';

function HomePage() {
  const [showLogOut, setLogOut] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  return (
    <div className={styles.root}>
      <div className="styles.headerContainer">
        <PageTitle>Welcome to Your Todo List!</PageTitle>
        <Subtitle>
          Enter your assignments and todos below to stay organized and make the
          most out of your day!
        </Subtitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
        <Name>Azza Nasima - 2602158166</Name>
      </div>
      <div className={styles.editLogOutContainer}>
        <button type="button" onClick={() => setShowEditProfile(true)}>
          Edit Profile
        </button>{' '}
        <button type="button" onClick={() => setLogOut(true)}>
          Log out
        </button>
      </div>
      {showLogOut && <LogoutPage onLogout={() => setLogOut(false)} />}
      {showEditProfile && (
        <Profile onClose={() => setShowEditProfile(false)} />
      )}{' '}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </div>
  );
}

export default HomePage;
