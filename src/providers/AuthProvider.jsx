import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "../contexts/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = async (value) => {
    try {
      await updateProfile(auth.currentUser, value);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const onSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => onSubscribe();
  }, []);

  const authInfo = {
    currentUser,
    createUser,
    signInUser,
    signInWithGoogle,
    updateUserProfile,
    signOutUser,
  };

  return (
    <AuthContext value={authInfo}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext>
  );
};

export default AuthProvider;
