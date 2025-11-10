# Instrucciones de Configuración del Frontend

## Variables de Entorno

Para configurar el frontend, crea un archivo `.env` en la carpeta `frontend` con el siguiente contenido:

```
REACT_APP_API_URL=http://localhost:8080/api
```

## Alternativa: Variables de Entorno del Sistema

### Windows (PowerShell)

```powershell
$env:REACT_APP_API_URL="http://localhost:8080/api"
```

### Linux/Mac

```bash
export REACT_APP_API_URL="http://localhost:8080/api"
```

## Instalación y Ejecución

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia la aplicación:
   ```bash
   npm start
   ```

3. La aplicación se abrirá automáticamente en: `http://localhost:3000`

## Nota

Asegúrate de que el backend esté ejecutándose en `http://localhost:8080` antes de iniciar el frontend.

