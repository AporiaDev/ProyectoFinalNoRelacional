# Tienda de Renta de Películas - FullStack Application

Aplicación FullStack para la gestión de una tienda de renta de películas desarrollada con Spring Boot (Backend) y React (Frontend), utilizando MongoDB como base de datos no relacional.

## 🚀 Tecnologías Utilizadas

### Backend
- **Spring Boot 3.x** - Framework Java
- **Spring Security** - Seguridad y autenticación
- **JWT (JSON Web Tokens)** - Autenticación stateless
- **BCrypt** - Cifrado de contraseñas
- **Spring Data MongoDB** - Integración con MongoDB
- **Swagger/OpenAPI** - Documentación de API
- **Maven** - Gestión de dependencias

### Frontend
- **React 18.x** - Biblioteca de UI
- **Axios** - Cliente HTTP
- **React Router** - Navegación
- **Bootstrap/React Bootstrap** - Estilos

### Base de Datos
- **MongoDB Atlas** - Base de datos en la nube

## 📁 Estructura del Proyecto

```
ProyectoFinalNoRelacional/
├── backend/                 # Aplicación Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── tienda/
│   │       │           └── peliculas/
│   │       │               ├── config/
│   │       │               ├── controller/
│   │       │               ├── model/
│   │       │               ├── repository/
│   │       │               ├── security/
│   │       │               └── service/
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   └── .env.example
├── frontend/                # Aplicación React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🔧 Configuración e Instalación

### Prerrequisitos

- **Java 17 o superior**
- **Node.js 18.x o superior** y npm
- **MongoDB Atlas** - Cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Maven 3.8+** (opcional, puede usar el wrapper incluido)

### 1. Configuración de MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuevo cluster (gratuito)
3. Crea un usuario de base de datos con permisos de lectura/escritura
4. Configura el acceso de red (añade `0.0.0.0/0` para permitir todas las IPs o tu IP específica)
5. Obtén la cadena de conexión (Connection String) que se verá así:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority
   ```

### 2. Configuración del Backend

1. Navega a la carpeta `backend`:
   ```bash
   cd backend
   ```

2. Configura las variables de entorno. Tienes dos opciones:

   **Opción A: Variables de entorno del sistema (Recomendado)**
   
   En Windows (PowerShell):
   ```powershell
   $env:MONGODB_URI="mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/tienda_peliculas?retryWrites=true&w=majority"
   $env:JWT_SECRET="tu_clave_secreta_muy_segura_y_larga_minimo_256_bits"
   $env:JWT_EXPIRATION="86400000"
   $env:SERVER_PORT="8080"
   ```
   
   En Linux/Mac:
   ```bash
   export MONGODB_URI="mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/tienda_peliculas?retryWrites=true&w=majority"
   export JWT_SECRET="tu_clave_secreta_muy_segura_y_larga_minimo_256_bits"
   export JWT_EXPIRATION="86400000"
   export SERVER_PORT="8080"
   ```
   
   **Opción B: Editar application.properties directamente**
   
   Edita el archivo `backend/src/main/resources/application.properties` y reemplaza los valores por defecto con tus credenciales.

4. Compila y ejecuta la aplicación:
   ```bash
   # Con Maven wrapper (Windows)
   mvnw.cmd spring-boot:run
   
   # O con Maven instalado
   mvn spring-boot:run
   ```

5. La API estará disponible en: `http://localhost:8080`
6. La documentación Swagger estará en: `http://localhost:8080/swagger-ui.html`

### 3. Configuración del Frontend

1. Navega a la carpeta `frontend`:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la carpeta `frontend` con el siguiente contenido:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```
   
   O configura la variable de entorno antes de ejecutar:
   
   En Windows (PowerShell):
   ```powershell
   $env:REACT_APP_API_URL="http://localhost:8080/api"
   ```
   
   En Linux/Mac:
   ```bash
   export REACT_APP_API_URL="http://localhost:8080/api"
   ```

5. Inicia la aplicación:
   ```bash
   npm start
   ```

6. La aplicación estará disponible en: `http://localhost:3000`

## 📚 Endpoints de la API

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Películas (requieren autenticación)

- `GET /api/peliculas` - Listar todas las películas
- `GET /api/peliculas/{id}` - Obtener película por ID
- `POST /api/peliculas` - Crear nueva película
- `PUT /api/peliculas/{id}` - Actualizar película
- `DELETE /api/peliculas/{id}` - Eliminar película

### Documentación Completa

Accede a la documentación interactiva de Swagger en: `http://localhost:8080/swagger-ui.html`

## 🔐 Autenticación

La aplicación utiliza JWT (JSON Web Tokens) para la autenticación. Después de hacer login:

1. El token JWT se almacena en `localStorage`
2. Todas las peticiones a endpoints protegidos deben incluir el token en el header:
   ```
   Authorization: Bearer <token>
   ```

## 📝 Modelo de Datos

### Usuario
- `id` (String, auto-generado)
- `username` (String, único, requerido)
- `email` (String, único, requerido)
- `password` (String, cifrado con BCrypt)
- `createdAt` (Date)
- `updatedAt` (Date)

### Película
- `id` (String, auto-generado)
- `titulo` (String, requerido)
- `genero` (String, requerido)
- `año` (Integer, requerido)
- `director` (String)
- `disponible` (Boolean, default: true)
- `precioRenta` (Double, requerido)
- `createdAt` (Date, auto-generado)
- `updatedAt` (Date, auto-generado)

## 🧪 Ejemplos de Uso

### Registrar Usuario
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario1",
    "email": "usuario1@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario1",
    "password": "password123"
  }'
```

### Crear Película (requiere token)
```bash
curl -X POST http://localhost:8080/api/peliculas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{
    "titulo": "Inception",
    "genero": "Ciencia Ficción",
    "año": 2010,
    "director": "Christopher Nolan",
    "disponible": true,
    "precioRenta": 5.99
  }'
```

## 🛠️ Desarrollo

### Backend
- El backend sigue el patrón MVC (Modelo-Vista-Controlador)
- Las capas están organizadas en: Model, Repository, Service, Controller
- La seguridad está configurada con Spring Security y JWT

### Frontend
- El frontend utiliza React con componentes funcionales y hooks
- Las peticiones HTTP se realizan mediante Axios
- El token JWT se almacena en localStorage
- Se incluyen validaciones de formularios y mensajes de error/éxito

## 📄 Licencia

Este proyecto es de uso educativo.

## 👥 Autores

Bryan Silva
Reinaldo Cárdenas

