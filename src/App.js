import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import TextEditor from './components/TextEditor'; // Import the TextEditor component
import { v4 as uuidV4 } from 'uuid';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import Error from './pages/Error';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Use PrivateRoute for the private document route */}
      
        <Route path="/documents/:id" element={<PrivateRoute><TextEditor /></PrivateRoute>} />
      
      {/* The route below is used to redirect to a new document with a generated ID */}
      <Route path="/document" element={<Navigate to={`/documents/${uuidV4()}`} />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
