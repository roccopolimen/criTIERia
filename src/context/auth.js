import {useState, useEffect, createContext} from 'react';
import firebaseApp from 'api/firebase';
import Loading from 'components/Loading';

export const authContext = createContext();
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    firebaseApp.auth().onAuthStateChanged((newUser) => {
      setUser(newUser);
      setLoading(false);
    });
  }, []);

  if(loading) return  <Loading />
  return (
    <authContext.Provider value={{user}}>
      {children}
    </authContext.Provider>
  );
};