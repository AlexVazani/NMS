import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectToken } from "services/features/authSlice";

const RequireAuth = () => {
  const token = useSelector(selectToken);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
