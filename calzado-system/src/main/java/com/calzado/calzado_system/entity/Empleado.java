package com.calzado.calzado_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "empleado")
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoProcesoProduccion procesoPrincipal;

    @Column(nullable = false)
    private Boolean activo = true;

    public Empleado() {
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoProcesoProduccion getProcesoPrincipal() {
        return procesoPrincipal;
    }

    public void setProcesoPrincipal(TipoProcesoProduccion procesoPrincipal) {
        this.procesoPrincipal = procesoPrincipal;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}