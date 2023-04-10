import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectToken, loginSuccess } from "services/features/authSlice";

const RequireAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const storedAuthState = JSON.parse(localStorage.getItem("authState"));
  // Because of refresh, store authState again saved in browser
  if (storedAuthState && storedAuthState.token && !token) {
    dispatch(loginSuccess(storedAuthState));
  }
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
