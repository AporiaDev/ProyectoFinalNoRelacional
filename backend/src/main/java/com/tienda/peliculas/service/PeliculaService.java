package com.tienda.peliculas.service;

import com.tienda.peliculas.model.Pelicula;
import com.tienda.peliculas.repository.PeliculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PeliculaService {
    
    @Autowired
    private PeliculaRepository peliculaRepository;
    
    public List<Pelicula> obtenerTodas() {
        return peliculaRepository.findAll();
    }
    
    public Optional<Pelicula> obtenerPorId(String id) {
        return peliculaRepository.findById(id);
    }
    
    public Pelicula crear(Pelicula pelicula) {
        pelicula.setCreatedAt(LocalDateTime.now());
        pelicula.setUpdatedAt(LocalDateTime.now());
        return peliculaRepository.save(pelicula);
    }
    
    public Pelicula actualizar(String id, Pelicula peliculaActualizada) {
        Optional<Pelicula> peliculaExistente = peliculaRepository.findById(id);
        
        if (peliculaExistente.isPresent()) {
            Pelicula pelicula = peliculaExistente.get();
            pelicula.setTitulo(peliculaActualizada.getTitulo());
            pelicula.setGenero(peliculaActualizada.getGenero());
            pelicula.setAño(peliculaActualizada.getAño());
            pelicula.setDirector(peliculaActualizada.getDirector());
            pelicula.setDisponible(peliculaActualizada.getDisponible());
            pelicula.setPrecioRenta(peliculaActualizada.getPrecioRenta());
            pelicula.setUpdatedAt(LocalDateTime.now());
            
            return peliculaRepository.save(pelicula);
        } else {
            throw new RuntimeException("Película no encontrada con id: " + id);
        }
    }
    
    public void eliminar(String id) {
        if (peliculaRepository.existsById(id)) {
            peliculaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Película no encontrada con id: " + id);
        }
    }
    
    public List<Pelicula> buscarPorTitulo(String titulo) {
        return peliculaRepository.findByTituloContainingIgnoreCase(titulo);
    }
    
    public List<Pelicula> buscarPorGenero(String genero) {
        return peliculaRepository.findByGenero(genero);
    }
    
    public List<Pelicula> buscarPorDisponibilidad(Boolean disponible) {
        return peliculaRepository.findByDisponible(disponible);
    }
}

