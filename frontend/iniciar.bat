@echo off
echo ========================================
echo Iniciando Frontend - Tienda de Peliculas
echo ========================================
echo.

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo node_modules no encontrado. Instalando dependencias...
    echo.
    call npm install
    if errorlevel 1 (
        echo ERROR: Fallo al instalar dependencias
        pause
        exit /b 1
    )
    echo.
    echo Dependencias instaladas correctamente!
    echo.
)

REM Verificar si existe archivo .env
if not exist ".env" (
    echo Archivo .env no encontrado. Creando...
    echo REACT_APP_API_URL=http://localhost:8080/api > .env
    echo Archivo .env creado!
    echo.
)

echo Iniciando servidor de desarrollo...
echo.
call npm start

pause

