import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import styles from './styles/modules/app.module.scss';
import LoginPage from './firebase/LoginPage';
import SignupPage from './firebase/SignupPage';
import HomePage from './firebase/HomePage'; // Import the HomePage component
import { auth } from './firebase/FirebaseConfig';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('Error retrieving authentication state:', error);
        setLoading(false);
      }
    );
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className={styles.root}>
        <div className="container">
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/"
              element={currentUser ? <HomePage /> : <LoginPage />}
            />
          </Routes>
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
    </Router>
  );
}

export default App;
