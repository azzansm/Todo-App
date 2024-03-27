import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { signIn, signInWithGoogle } from './AuthService';
import styles from '../styles/modules/login.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success('Logged in successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Failed to log in', error);
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/home');
    } catch (error) {
      console.error('Failed to sign in with Google', error);
      toast.error('Failed to sign in with Google');
    }
  };

  return (
    // <div className={styles.authContainer}>
    <div className={styles.authBackground}>
      <form onSubmit={handleLogin} className={styles.authForm}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={styles.inputField}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.inputField}
          required
        />
        <button type="submit" className={styles.authButton}>
          Log In
        </button>
        <button
          type="button"
          className={styles.googleSignInButton}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
        <p className={styles.signUpLink}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
    // </div>
  );
};

export default LoginPage;
