import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  updatePassword,
} from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { auth } from './FirebaseConfig';

const googleProvider = new GoogleAuthProvider();

const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
toast.success('Sign up successful! Please log in.');

const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
toast.success('Logged in successfully!');

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    console.error('Failed to sign in with Google', error);
    throw error;
  }
};

const signOutUser = () => signOut(auth);
toast.success('Signed out successfully!');

const updateUserProfile = async (user, { displayName, photoURL }) => {
  try {
    await updateProfile(user, { displayName, photoURL });
    toast.success('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
    toast.error('Failed to update profile.');
  }
};

const updateUserPassword = async (user, newPassword) => {
  try {
    await updatePassword(user, newPassword);
    toast.success('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error);
    toast.error('Failed to update password.');
  }
};

export {
  signUp,
  signIn,
  signInWithGoogle,
  signOutUser,
  updateUserPassword,
  updateUserProfile,
};
