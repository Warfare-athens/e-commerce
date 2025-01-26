import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();


  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
      return <Navigate to="/" />;
  }


  if (
    isAuthenticated && user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/" />;
  }
  if (!isAuthenticated  &&location.pathname.includes("admin")) {
    return <Navigate to="/" />;
  }

  


      return <>{children}</>;
}

export default CheckAuth;