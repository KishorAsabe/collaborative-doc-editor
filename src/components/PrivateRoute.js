import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

  if (token) {
    return children;
  } else {
    // Redirect to the login page if the token is null or undefined
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
