import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PeliculaList from './pages/PeliculaList';
import PeliculaForm from './pages/PeliculaForm';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/peliculas" 
          element={
            <PrivateRoute>
              <PeliculaList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/peliculas/nueva" 
          element={
            <PrivateRoute>
              <PeliculaForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/peliculas/editar/:id" 
          element={
            <PrivateRoute>
              <PeliculaForm />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

