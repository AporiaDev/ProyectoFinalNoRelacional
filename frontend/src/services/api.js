import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

export const peliculaService = {
  getAll: () => api.get('/peliculas'),
  getById: (id) => api.get(`/peliculas/${id}`),
  create: (pelicula) => api.post('/peliculas', pelicula),
  update: (id, pelicula) => api.put(`/peliculas/${id}`, pelicula),
  delete: (id) => api.delete(`/peliculas/${id}`),
  search: (params) => api.get('/peliculas/buscar', { params }),
};

export default api;

