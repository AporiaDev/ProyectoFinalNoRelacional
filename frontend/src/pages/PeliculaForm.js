import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { peliculaService } from '../services/api';
import NavbarComponent from '../components/Navbar';

const PeliculaForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    año: '',
    director: '',
    disponible: true,
    precioRenta: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      loadPelicula();
    }
  }, [id]);

  const loadPelicula = async () => {
    try {
      setLoadingData(true);
      const response = await peliculaService.getById(id);
      const pelicula = response.data;
      setFormData({
        titulo: pelicula.titulo || '',
        genero: pelicula.genero || '',
        año: pelicula.año || '',
        director: pelicula.director || '',
        disponible: pelicula.disponible !== undefined ? pelicula.disponible : true,
        precioRenta: pelicula.precioRenta || '',
      });
    } catch (err) {
      setError('Error al cargar la película');
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.titulo.trim()) {
      setError('El título es requerido');
      return false;
    }

    if (!formData.genero.trim()) {
      setError('El género es requerido');
      return false;
    }

    if (!formData.año || formData.año < 1888) {
      setError('El año debe ser válido (mínimo 1888)');
      return false;
    }

    if (!formData.precioRenta || formData.precioRenta < 0) {
      setError('El precio de renta debe ser mayor o igual a 0');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const peliculaData = {
        ...formData,
        año: parseInt(formData.año),
        precioRenta: parseFloat(formData.precioRenta),
      };

      if (isEdit) {
        await peliculaService.update(id, peliculaData);
        alert('Película actualizada exitosamente');
      } else {
        await peliculaService.create(peliculaData);
        alert('Película creada exitosamente');
      }

      navigate('/peliculas');
    } catch (err) {
      setError(
        err.response?.data?.error || 
        `Error al ${isEdit ? 'actualizar' : 'crear'} la película`
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <>
        <NavbarComponent />
        <Container className="text-center mt-5">
          <p>Cargando...</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavbarComponent />
      <Container>
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>
              <h2>{isEdit ? 'Editar Película' : 'Nueva Película'}</h2>
            </Card.Title>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Título *</Form.Label>
                <Form.Control
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ingresa el título de la película"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Género *</Form.Label>
                <Form.Control
                  type="text"
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  placeholder="Ej: Acción, Drama, Comedia, etc."
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Año *</Form.Label>
                <Form.Control
                  type="number"
                  name="año"
                  value={formData.año}
                  onChange={handleChange}
                  placeholder="Ej: 2020"
                  min="1888"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Director</Form.Label>
                <Form.Control
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  placeholder="Nombre del director"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio de Renta (COP) *</Form.Label>
                <Form.Control
                  type="number"
                  name="precioRenta"
                  value={formData.precioRenta}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="disponible"
                  label="Disponible para renta"
                  checked={formData.disponible}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
                </Button>
                <Button variant="secondary" onClick={() => navigate('/peliculas')}>
                  Cancelar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default PeliculaForm;

