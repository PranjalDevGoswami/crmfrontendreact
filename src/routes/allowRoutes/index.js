import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem('role'); // Fetch user details

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/error" />;
  }

  return element;
};

export default RoleProtectedRoute;
