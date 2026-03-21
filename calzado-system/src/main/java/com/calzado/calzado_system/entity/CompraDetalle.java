package com.calzado.calzado_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "compra_detalle")
public class CompraDetalle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // MVP: guardamos ids (sin relaciones)
    @Column(nullable = false)
    private Long compraId;

    @Column(nullable = false)
    private Long materialId;

    @Column(nullable = false)
    private Double cantidad;

    @Column(nullable = false)
    private Double costoUnitario;

    public CompraDetalle() {}

    public Long getId() { return id; }

    public Long getCompraId() { return compraId; }
    public void setCompraId(Long compraId) { this.compraId = compraId; }

    public Long getMaterialId() { return materialId; }
    public void setMaterialId(Long materialId) { this.materialId = materialId; }

    public Double getCantidad() { return cantidad; }
    public void setCantidad(Double cantidad) { this.cantidad = cantidad; }

    public Double getCostoUnitario() { return costoUnitario; }
    public void setCostoUnitario(Double costoUnitario) { this.costoUnitario = costoUnitario; }
}