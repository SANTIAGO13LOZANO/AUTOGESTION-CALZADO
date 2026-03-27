package com.calzado.calzado_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "producto_material")
public class ProductoMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long productoId;

    @Column(nullable = false)
    private Long materialId;

    @Column(nullable = false)
    private Double cantidad;

    public ProductoMaterial() {
    }

    public Long getId() {
        return id;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public Long getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Long materialId) {
        this.materialId = materialId;
    }

    public Double getCantidad() {
        return cantidad;
    }

    public void setCantidad(Double cantidad) {
        this.cantidad = cantidad;
    }
}