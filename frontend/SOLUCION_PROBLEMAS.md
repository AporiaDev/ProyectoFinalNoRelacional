# Solución de Problemas - Frontend

## Problema: No puedo acceder al frontend

### Paso 1: Verificar que estás en el directorio correcto

Asegúrate de estar en la carpeta `frontend`:

```powershell
cd "C:\Users\Bryan\OneDrive - UNIVERSIDAD INDUSTRIAL DE SANTANDER\Desktop\Documents\GitHub\ProyectoFinalNoRelacional\frontend"
```

### Paso 2: Instalar dependencias

Si es la primera vez que ejecutas el proyecto, necesitas instalar las dependencias:

```powershell
npm install
```

Esto puede tardar varios minutos la primera vez.

### Paso 3: Crear archivo .env

Crea un archivo llamado `.env` en la carpeta `frontend` con el siguiente contenido:

```
REACT_APP_API_URL=http://localhost:8080/api
```

### Paso 4: Iniciar el servidor de desarrollo

```powershell
npm start
```

El frontend debería abrirse automáticamente en `http://localhost:3000`

## Errores Comunes

### Error: "Cannot find module 'react-scripts'"

**Solución:** Ejecuta `npm install` nuevamente

### Error: "EADDRINUSE: address already in use :::3000"

**Solución:** El puerto 3000 está en uso. Puedes:
- Cerrar la aplicación que está usando el puerto 3000
- O cambiar el puerto: `set PORT=3001 && npm start`

### Error: "Module not found"

**Solución:** 
1. Elimina la carpeta `node_modules` y el archivo `package-lock.json`
2. Ejecuta `npm install` nuevamente

### El navegador se abre pero muestra error en blanco

**Solución:**
1. Abre la consola del navegador (F12)
2. Revisa los errores en la pestaña "Console"
3. Verifica que el backend esté ejecutándose en `http://localhost:8080`

### Error de conexión con el backend

**Solución:**
1. Verifica que el backend esté ejecutándose
2. Verifica que el archivo `.env` tenga la URL correcta: `REACT_APP_API_URL=http://localhost:8080/api`
3. Reinicia el servidor de desarrollo después de crear/modificar el `.env`

## Comandos Útiles

```powershell
# Limpiar e instalar dependencias
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Iniciar en modo desarrollo
npm start

# Construir para producción
npm run build
```

