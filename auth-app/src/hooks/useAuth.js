import { useState, useEffect } from "react";
import { getToken } from "../services/authService";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuth(!!token);
  }, []);

  return { isAuth };
}