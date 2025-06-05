import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('userType');

  // If not logged in, redirect to login
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  // If role is required and user doesn't have it, redirect to home
  if (requiredRole && userType !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 