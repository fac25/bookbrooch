import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const UnprotectedRoute = ({ children }) => {
  const router = useRouter();
  const { user /*userFetched*/ } = useAuth();

  useEffect(() => {
    if (user?.uid /*&& !userFetched*/) {
      router.push(`/users/${user.uid}`);
    }
    // else {
// console.log(user)
    // }
  }, [router, user /*userFetched*/]);
  return <div>{!user ? children : null}</div>;
};

export default UnprotectedRoute;
