import { Navigate } from "react-router-dom";

function ProtectedRouteForUser({ children }) {
  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  // If token is not found, redirect the user to the login page
  //   if (!token) {
  //     return <Redirect to="/login" />;
  //   }
  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }

  // Render the children components if the token exists
  return children;
}
export default ProtectedRouteForUser;
