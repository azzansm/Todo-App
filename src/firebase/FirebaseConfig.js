import { useEffect, useState } from 'react';

// Import the functions you need from the SDKs you need
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

const firebaseConfig = {
  apiKey: 'AIzaSyB1rAFTd0-CDUW4_QLucmkMpCDRLYXbb48',
  authDomain: 'fir-todoapp-f06f0.firebaseapp.com',
  projectId: 'fir-todoapp-f06f0',
  storageBucket: 'fir-todoapp-f06f0.appspot.com',
  messagingSenderId: '716108997941',
  appId: '1:716108997941:web:a0494ce2da4d61a75cd87c',
  measurementId: 'G-N7DLQPL08Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
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
