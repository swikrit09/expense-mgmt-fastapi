import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUser } from '../utils/getUser';
import Cookies from 'js-cookie';

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

 const fetchUser = async () => {
    setLoading(true)
    const userData = await getUser();
    if (userData) {
      setUser(userData);
      console.log(userData)
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const loginUser = async (token) => {
    Cookies.set("token_expense", token); 
    await fetchUser(); 
  };
  

  return (
    <UserContext.Provider value={{ user, setUser, loading,setLoading,loginUser }}>
      {children}
    </UserContext.Provider>
  );
};
