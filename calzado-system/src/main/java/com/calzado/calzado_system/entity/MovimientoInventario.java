package com.calzado.calzado_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "movimiento_inventario")
public class MovimientoInventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Muchos movimientos pertenecen a un material
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id", nullable = false)
    private Material material;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoMovimiento tipo;

    @Column(nullable = false)
    private Double cantidad; // siempre positiva

    @Column(length = 200)
    private String referencia;

    @Column(nullable = false)
    private Double stockAnterior;

    @Column(nullable = false)
    private Double stockPosterior;

    public MovimientoInventario() {}

    public Long getId() {
        return id;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public TipoMovimiento getTipo() {
        return tipo;
    }

    public void setTipo(TipoMovimiento tipo) {
        this.tipo = tipo;
    }

    public Double getCantidad() {
        return cantidad;
    }

    public void setCantidad(Double cantidad) {
        this.cantidad = cantidad;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public Double getStockAnterior() {
        return stockAnterior;
    }

    public void setStockAnterior(Double stockAnterior) {
        this.stockAnterior = stockAnterior;
    }

    public Double getStockPosterior() {
        return stockPosterior;
    }

    public void setStockPosterior(Double stockPosterior) {
        this.stockPosterior = stockPosterior;
    }
}