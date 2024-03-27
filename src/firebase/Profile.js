import React, { useState, useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { updateUserProfile } from './AuthService';
import { auth, upload } from './FirebaseConfig';
import styles from '../styles/modules/profile.module.scss';

const EditProfile = ({ onClose }) => {
  const [displayName, setDisplayName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    setCurrentUser(auth.currentUser);
    setDisplayName(auth.currentUser.displayName || '');
    setProfilePictureUrl(auth.currentUser.photoURL || null);
  }, []);

  const handlePhotoChange = (event) => {
    if (event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    if (photo) {
      await upload(photo, currentUser, (url) => setProfilePictureUrl(url));
    }
    if (displayName) {
      await updateUserProfile(currentUser, {
        displayName,
        photoURL: profilePictureUrl,
      });
    }
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div
          className={styles.closeButton}
          onClick={onClose}
          onKeyDown={onClose}
          tabIndex={0}
          role="button"
        >
          <MdOutlineClose />
        </div>
        <form onSubmit={handleProfileUpdate} className={styles.form}>
          <h1 className={styles.formTitle}>Edit Profile</h1>
          <div className={styles.profilePictureContainer}>
            {profilePictureUrl && (
              <img
                src={profilePictureUrl}
                alt="Profile"
                className={styles.profilePicture}
              />
            )}
          </div>
          <label htmlFor="displayName">
            Name
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={styles.input}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              value={currentUser ? currentUser.email : ''}
              disabled
              className={styles.input}
            />
          </label>
          <label htmlFor="profilePicture">
            Profile Picture
            <input
              type="file"
              id="profilePicture"
              onChange={handlePhotoChange}
              className={styles.input}
            />
          </label>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.primaryButton}>
              Save Changes
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
