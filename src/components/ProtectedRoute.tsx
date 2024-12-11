import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Update with your AuthContext path
interface props{
    children:any
}
const ProtectedRoute:React.FC<props> = ({ children }) => {
//   const { user } = useContext(AuthContext); // Assuming user is the object with authentication details
  const { user,userBalance, logout } = useAuth(); // Get user and logout function from context
  const storedUser = localStorage.getItem('user');

  // If the user is not logged in, redirect to the login page
  if (!user&&!storedUser) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, return the children components (protected routes)
  return children;
};

export default ProtectedRoute;
