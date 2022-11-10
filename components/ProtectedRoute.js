import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user, /*userFetched*/ } = useAuth();

  useEffect(() => {
    console.log({ user, /*userFetched*/ })

    if (!user?.uid /*&& !userFetched*/) {
      router.push("/login");
    }
    // else {
    //   console.log(user)
    // }
  }, [router, user, /*userFetched*/]);
  return <div>{user ? children : null}</div>;
};

export default ProtectedRoute;
