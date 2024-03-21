import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppHeader from './components/AppHeader';
import { PageTitle, Subtitle, Name } from './components/PageTitle';
import styles from './styles/modules/app.module.scss';
import AppContent from './components/AppContent';

function App() {
  return (
    <div className={styles.root}>
      <div className="container">
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

export default App;
