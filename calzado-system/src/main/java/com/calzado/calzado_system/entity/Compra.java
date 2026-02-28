package com.calzado.calzado_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "compra")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Para MVP: guardamos el id del proveedor (sin relación JPA todavía)
    @Column(nullable = false)
    private Long proveedorId;

    @Column(nullable = false)
    private LocalDateTime fecha;

    private String referencia;

    public Compra() {
        this.fecha = LocalDateTime.now();
    }

    public Compra(Long proveedorId, String referencia) {
        this.proveedorId = proveedorId;
        this.referencia = referencia;
        this.fecha = LocalDateTime.now();
    }

    public Long getId() { return id; }

    public Long getProveedorId() { return proveedorId; }
    public void setProveedorId(Long proveedorId) { this.proveedorId = proveedorId; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public String getReferencia() { return referencia; }
    public void setReferencia(String referencia) { this.referencia = referencia; }
}