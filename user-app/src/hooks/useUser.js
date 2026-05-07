import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile()
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return user;
}