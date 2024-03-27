import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from './AuthService';
import styles from '../styles/modules/signout.module.scss';

const LogoutPage = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOutUser();
    navigate('/login');
    if (onLogout) onLogout();
  };

  const handleClose = () => {
    navigate('/');
    if (onLogout) onLogout();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close"
          onClick={handleClose}
        >
          &times;
        </button>
        <p id="logoutConfirmation">Are you sure you want to log out?</p>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            aria-labelledby="logoutConfirmation"
            onClick={handleLogout} // Logout and redirect to login
            className={styles.logoutButton}
          >
            Yes, Log out
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default LogoutPage;
