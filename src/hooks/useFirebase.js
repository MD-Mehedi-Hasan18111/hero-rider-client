import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userProfileInfo, setUserProfileInfo] = useState({});
  // const [isAdmin, setIsAdmin] = useState(false);

  // get the user profile information
  useEffect(() => {
    fetch(`http://localhost:5000/userProfile/${user.email}`)
      .then((res) => res.json())
      .then((data) => setUserProfileInfo(data));
  }, [userProfileInfo, user.email]);

  const auth = getAuth();

  const Register = (name, email, password, navigate, location) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        const newUser = { email, displayName: name };
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        setUser(newUser);
        const destination = location.state?.from || "/userProfile";
        navigate(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // user sign in
  const signInUser = (email, password, navigate, location) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        const destination = location.state?.from || "/userProfile";
        navigate(destination);
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // observer user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
  }, [auth]);

  // user logout
  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    user,
    userProfileInfo,
    Register,
    isLoading,
    signInUser,
    logOut,
  };
};

export default useFirebase;
