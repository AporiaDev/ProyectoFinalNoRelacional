# Guía Rápida - Iniciar Frontend

## Pasos Rápidos

### 1. Abrir terminal en la carpeta frontend

```powershell
cd "C:\Users\Bryan\OneDrive - UNIVERSIDAD INDUSTRIAL DE SANTANDER\Desktop\Documents\GitHub\ProyectoFinalNoRelacional\frontend"
```

### 2. Instalar dependencias (solo la primera vez)

```powershell
npm install
```

**Nota:** Esto puede tardar 2-5 minutos la primera vez.

### 3. Crear archivo .env

Crea un archivo llamado `.env` (sin extensión) en la carpeta `frontend` con este contenido:

```
REACT_APP_API_URL=http://localhost:8080/api
```

### 4. Iniciar el servidor

```powershell
npm start
```

### 5. Acceder al frontend

El navegador se abrirá automáticamente en `http://localhost:3000`

## Alternativa: Usar el script automático

Simplemente ejecuta el archivo `iniciar.bat` haciendo doble clic sobre él.

## Verificar que todo funciona

1. ✅ El backend debe estar ejecutándose en `http://localhost:8080`
2. ✅ El frontend debe abrirse en `http://localhost:3000`
3. ✅ Deberías ver la página de inicio con el botón "Iniciar Sesión"

## Si hay errores

Revisa el archivo `SOLUCION_PROBLEMAS.md` para soluciones detalladas.

