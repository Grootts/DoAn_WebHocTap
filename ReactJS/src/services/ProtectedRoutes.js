import React from "react";
import { Link, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Link to="/login" />;
};
export default ProtectedRoutes;
