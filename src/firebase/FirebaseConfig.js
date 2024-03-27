import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import config from './Firebase';

// Initialize Firebase
const app = initializeApp(config);
const auth = getAuth();
const storage = getStorage();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, `${currentUser.uid}.png`);

  setLoading(true);

  try {
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(currentUser, { photoURL });
    setLoading(false);
    alert('Uploaded file!');
  } catch (error) {
    console.error('Error uploading file:', error);
    setLoading(false);
    alert('Error uploading file. Please try again.');
  }
}

export { app, auth };
