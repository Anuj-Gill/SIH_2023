import { createContext, useState, useEffect } from "react";
import { getStorage } from "../utils/localstorage-utils";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getStorage("token");
    const user = getStorage("user")
    if(user){
      setUser(user)
    }
    if (token) {
      setIsLoggedIn(true);
      // 
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return <AppContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>{children}</AppContext.Provider>;
}