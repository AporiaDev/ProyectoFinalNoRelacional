import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUsername, clearAuth } from '../utils/auth';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const username = getUsername();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">🎬 Tienda de Películas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Inicio</Nav.Link>
            <Nav.Link onClick={() => navigate('/peliculas')}>Películas</Nav.Link>
            <Nav.Link onClick={() => navigate('/peliculas/nueva')}>Nueva Película</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {username && (
              <>
                <Navbar.Text className="me-3">
                  Bienvenido, <strong>{username}</strong>
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

