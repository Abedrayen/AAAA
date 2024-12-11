import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: string | null;
  login: (userName: string,tokens?:any) => void;
  logout: () => void;
  updateBalance :(bal:any)=> void;
  userBalance:string|null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [accessToken,setAccessToken]= useState<string | null>(null);
  const [refreshToken,setRefreshToken]= useState<string | null>(null);
  const [userBalance,setUserBalance]=useState<string | null>(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

   // Function to check if the JWT token is expired
   const isTokenExpired = (token:string) => {
    try {
      const decodedToken = jwtDecode(token); // Decode the JWT
      if (!decodedToken||!decodedToken.exp||decodedToken.exp * 1000 < Date.now()) { // exp is in seconds, so multiply by 1000 for milliseconds
        return true;
      }
      return false;
    } catch (error) {
      return true; // If the token is invalid, treat it as expired
    }
  };

  useEffect(() => {
    // Check for tokens and user in localStorage
    const storedAccess = localStorage.getItem('accessToken');
    const storedRefresh = localStorage.getItem('refreshToken');
    const storedUser = localStorage.getItem('user');

    // If the access token is present but expired, log out and navigate to login
    if (storedAccess && isTokenExpired(storedAccess)) {
      console.log('token expireddd !!!')
      logout(); // Assume you have a logout function
      navigate('/login');
      return;
    }

    // Set tokens if they are not expired
    if (storedAccess) {
      setAccessToken(storedAccess); // Assuming setAccessToken is defined
    }

    if (storedRefresh) {
      setRefreshToken(storedRefresh); // Assuming setRefreshToken is defined
    }

    // Parse and set user data if available
    if (storedUser) {
      const userParsed = JSON.parse(storedUser);
      if (userParsed) {
        setUser(userParsed.name); // Assuming setUser is defined
        setUserBalance(userParsed.balance); // Assuming setUserBalance is defined
      }
    }
  }, [navigate]); // Ensure navigate is up-to-date

  const login = (user: any,tokens:any=undefined) => {
    console.log('sign inn user ...',user)
    console.log('sign in with tokens ...',tokens)
    const userName=user?.name||"user!"
    localStorage.setItem('user', JSON.stringify(user));
    setUser(userName);
    setUserBalance(user?.balance||'0')


    if(tokens){
      updateTokens(tokens)
    }
  };

  const updateTokens=(tokens:any)=>{
    localStorage.setItem('accessToken',tokens.accessToken)
    localStorage.setItem('refreshToken',tokens.refreshToken)
    setAccessToken(tokens.accessToken)
    setRefreshToken(tokens.refreshToken)
  }

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null);
    setAccessToken(null)
    setRefreshToken(null)
  };

  const updateBalance=(balance:any)=>{
    setUserBalance(balance)
  }


  

  return (
    <AuthContext.Provider value={{ user, userBalance,login, logout,updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
