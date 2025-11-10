import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';
import { isAuthenticated } from '../utils/auth';

const Home = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  return (
    <>
      <NavbarComponent />
      <Container>
        <Card className="mt-5">
          <Card.Body className="text-center">
            <h1 className="mb-4">🎬 Bienvenido a la Tienda de Películas</h1>
            <p className="lead">
              Sistema de gestión para la renta de películas
            </p>
            
            {authenticated ? (
              <div className="mt-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => navigate('/peliculas')}
                  className="me-2"
                >
                  Ver Películas
                </Button>
                <Button 
                  variant="success" 
                  size="lg" 
                  onClick={() => navigate('/peliculas/nueva')}
                >
                  Agregar Nueva Película
                </Button>
              </div>
            ) : (
              <div className="mt-4">
                <p>Por favor, inicia sesión para acceder al sistema</p>
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => navigate('/login')}
                >
                  Iniciar Sesión
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Home;

