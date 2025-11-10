# Instrucciones de Configuración del Backend

## Variables de Entorno

Para configurar el backend, necesitas establecer las siguientes variables de entorno:

### Windows (PowerShell)

```powershell
# MongoDB Connection String
$env:MONGODB_URI="mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/tienda_peliculas?retryWrites=true&w=majority"

# JWT Secret (mínimo 256 bits)
$env:JWT_SECRET="tu_clave_secreta_muy_segura_y_larga_minimo_256_bits_cambiar_en_produccion"

# JWT Expiration (en milisegundos, 86400000 = 24 horas)
$env:JWT_EXPIRATION="86400000"

# Server Port
$env:SERVER_PORT="8080"
```

### Linux/Mac

```bash
# MongoDB Connection String
export MONGODB_URI="mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/tienda_peliculas?retryWrites=true&w=majority"

# JWT Secret (mínimo 256 bits)
export JWT_SECRET="tu_clave_secreta_muy_segura_y_larga_minimo_256_bits_cambiar_en_produccion"

# JWT Expiration (en milisegundos, 86400000 = 24 horas)
export JWT_EXPIRATION="86400000"

# Server Port
export SERVER_PORT="8080"
```

## Alternativa: Editar application.properties

Si prefieres no usar variables de entorno, puedes editar directamente el archivo:
`src/main/resources/application.properties`

Y reemplazar los valores por defecto con tus credenciales.

## Ejecutar la Aplicación

Después de configurar las variables de entorno:

```bash
# Con Maven wrapper (Windows)
mvnw.cmd spring-boot:run

# Con Maven wrapper (Linux/Mac)
./mvnw spring-boot:run

# O con Maven instalado
mvn spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080`
La documentación Swagger estará en: `http://localhost:8080/swagger-ui.html`

