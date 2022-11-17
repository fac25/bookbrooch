import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/auth.js";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Loader from "../components/Loader.js";
import { useRouter } from "next/router.js";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  //const router = useRouter();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  // const [userFetched, setUserFetched] = useState(false)

  useEffect(() => {
    const checkUserState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
        // setUserFetched(true);
      }
      setLoading(false);
      // else {
      //   setUser({ email: null, uid: null });
      // }
    });

    return () => checkUserState();
  }, []);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, setUser }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
