package com.tienda.peliculas.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.DecimalMin;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "peliculas")
public class Pelicula {
    
    @Id
    private String id;
    
    @NotBlank(message = "El título es requerido")
    private String titulo;
    
    @NotBlank(message = "El género es requerido")
    private String genero;
    
    @NotNull(message = "El año es requerido")
    @Min(value = 1888, message = "El año debe ser válido")
    private Integer año;
    
    private String director;
    
    private Boolean disponible = true;
    
    @NotNull(message = "El precio de renta es requerido")
    @DecimalMin(value = "0.0", message = "El precio de renta debe ser mayor o igual a 0")
    private Double precioRenta;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public Pelicula() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.disponible = true;
    }
    
    // Getters y Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getTitulo() {
        return titulo;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public String getGenero() {
        return genero;
    }
    
    public void setGenero(String genero) {
        this.genero = genero;
    }
    
    public Integer getAño() {
        return año;
    }
    
    public void setAño(Integer año) {
        this.año = año;
    }
    
    public String getDirector() {
        return director;
    }
    
    public void setDirector(String director) {
        this.director = director;
    }
    
    public Boolean getDisponible() {
        return disponible;
    }
    
    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }
    
    public Double getPrecioRenta() {
        return precioRenta;
    }
    
    public void setPrecioRenta(Double precioRenta) {
        this.precioRenta = precioRenta;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

