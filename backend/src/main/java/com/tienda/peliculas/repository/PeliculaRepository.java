package com.tienda.peliculas.repository;

import com.tienda.peliculas.model.Pelicula;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PeliculaRepository extends MongoRepository<Pelicula, String> {
    List<Pelicula> findByTituloContainingIgnoreCase(String titulo);
    List<Pelicula> findByGenero(String genero);
    List<Pelicula> findByDisponible(Boolean disponible);
}

