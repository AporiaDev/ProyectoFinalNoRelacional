import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Table, Badge, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { peliculaService } from '../services/api';
import NavbarComponent from '../components/Navbar';

const PeliculaList = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadPeliculas();
  }, []);

  const loadPeliculas = async () => {
    try {
      setLoading(true);
      const response = await peliculaService.getAll();
      setPeliculas(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar las películas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, titulo) => {
    if (window.confirm(`¿Estás seguro de eliminar la película "${titulo}"?`)) {
      try {
        await peliculaService.delete(id);
        setSuccess('Película eliminada exitosamente');
        loadPeliculas();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Error al eliminar la película');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(amount);
  };

  if (loading) {
    return (
      <>
        <NavbarComponent />
        <Container className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavbarComponent />
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
          <h1>Lista de Películas</h1>
          <Button variant="primary" onClick={() => navigate('/peliculas/nueva')}>
            + Nueva Película
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {peliculas.length === 0 ? (
          <Card>
            <Card.Body className="text-center">
              <p>No hay películas registradas. ¡Crea una nueva!</p>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Género</th>
                    <th>Año</th>
                    <th>Director</th>
                    <th>Precio Renta</th>
                    <th>Disponible</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {peliculas.map((pelicula) => (
                    <tr key={pelicula.id}>
                      <td><strong>{pelicula.titulo}</strong></td>
                      <td>{pelicula.genero}</td>
                      <td>{pelicula.año}</td>
                      <td>{pelicula.director || 'N/A'}</td>
                      <td>{formatCurrency(pelicula.precioRenta)}</td>
                      <td>
                        {pelicula.disponible ? (
                          <Badge bg="success">Disponible</Badge>
                        ) : (
                          <Badge bg="danger">No Disponible</Badge>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => navigate(`/peliculas/editar/${pelicula.id}`)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(pelicula.id, pelicula.titulo)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default PeliculaList;

