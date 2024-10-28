import React, { useState, useEffect } from 'react';
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider, signOut, getRedirectResult } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthProps {
  user: any | null;
}

const Auth: React.FC<AuthProps> = ({ user }) => {
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('Redirect sign-in successful');
          setIsSigningIn(false);
        }
      } catch (error: any) {
        console.error('Redirect sign-in error:', error);
        setError(`Failed to sign in: ${error.message}`);
        setIsSigningIn(false);
      }
    };

    handleRedirectResult();
  }, []);

  const handleSignIn = async () => {
    setError(null);
    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setIsSigningIn(false);
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked') {
        try {
          await signInWithRedirect(auth, provider);
        } catch (redirectError: any) {
          setError(`Failed to sign in: ${redirectError.message}`);
          setIsSigningIn(false);
        }
      } else if (error.code === 'auth/unauthorized-domain') {
        setError("This domain is not authorized for authentication. Please use an authorized domain or contact the administrator.");
        setIsSigningIn(false);
      } else {
        setError(`Failed to sign in: ${error.message}`);
        setIsSigningIn(false);
      }
      console.error('Sign-in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      setError(`Failed to sign out: ${error.message}`);
      console.error('Sign-out error:', error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <span>Welcome, {user.displayName}</span>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={handleSignIn}
          disabled={isSigningIn}
          className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
            isSigningIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {isSigningIn ? 'Signing In...' : 'Sign In with Google'}
        </button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Auth;