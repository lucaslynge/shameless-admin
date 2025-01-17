// components/AuthGarud.js
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const AuthGuard = ({ children }) => {
  const { authToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authToken) {
      router.push("/"); // Redirect to login if no token
    }
  }, [authToken, router]);

  // If there is no token, don't render the page
  if (!authToken) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
