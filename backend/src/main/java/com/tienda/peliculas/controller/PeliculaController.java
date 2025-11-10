package com.tienda.peliculas.controller;

import com.tienda.peliculas.model.Pelicula;
import com.tienda.peliculas.service.PeliculaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/peliculas")
@Tag(name = "Películas", description = "Endpoints para gestión de películas (CRUD)")
@CrossOrigin(origins = "http://localhost:3000")
public class PeliculaController {
    
    @Autowired
    private PeliculaService peliculaService;
    
    @GetMapping
    @Operation(summary = "Listar todas las películas", 
               description = "Obtiene una lista de todas las películas disponibles",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<Pelicula>> listarTodas() {
        List<Pelicula> peliculas = peliculaService.obtenerTodas();
        return ResponseEntity.ok(peliculas);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Obtener película por ID", 
               description = "Obtiene los detalles de una película específica",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> obtenerPorId(@PathVariable String id) {
        Optional<Pelicula> pelicula = peliculaService.obtenerPorId(id);
        if (pelicula.isPresent()) {
            return ResponseEntity.ok(pelicula.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(createErrorResponse("Película no encontrada"));
        }
    }
    
    @PostMapping
    @Operation(summary = "Crear nueva película", 
               description = "Crea una nueva película en el sistema",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> crear(@Valid @RequestBody Pelicula pelicula) {
        try {
            Pelicula nuevaPelicula = peliculaService.crear(pelicula);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaPelicula);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(createErrorResponse("Error al crear la película: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar película", 
               description = "Actualiza los datos de una película existente",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> actualizar(@PathVariable String id, 
                                       @Valid @RequestBody Pelicula pelicula) {
        try {
            Pelicula peliculaActualizada = peliculaService.actualizar(id, pelicula);
            return ResponseEntity.ok(peliculaActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(createErrorResponse(e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar película", 
               description = "Elimina una película del sistema",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> eliminar(@PathVariable String id) {
        try {
            peliculaService.eliminar(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Película eliminada exitosamente");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(createErrorResponse(e.getMessage()));
        }
    }
    
    @GetMapping("/buscar")
    @Operation(summary = "Buscar películas", 
               description = "Busca películas por título, género o disponibilidad",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<Pelicula>> buscar(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) String genero,
            @RequestParam(required = false) Boolean disponible) {
        
        if (titulo != null && !titulo.isEmpty()) {
            return ResponseEntity.ok(peliculaService.buscarPorTitulo(titulo));
        } else if (genero != null && !genero.isEmpty()) {
            return ResponseEntity.ok(peliculaService.buscarPorGenero(genero));
        } else if (disponible != null) {
            return ResponseEntity.ok(peliculaService.buscarPorDisponibilidad(disponible));
        } else {
            return ResponseEntity.ok(peliculaService.obtenerTodas());
        }
    }
    
    private Map<String, String> createErrorResponse(String message) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        return error;
    }
}

