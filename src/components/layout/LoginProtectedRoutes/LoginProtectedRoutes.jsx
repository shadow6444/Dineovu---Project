import { Navigate, Outlet } from "react-router-dom";

const LoginProtectedRoutes = () => {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />;
};
export default LoginProtectedRoutes;
