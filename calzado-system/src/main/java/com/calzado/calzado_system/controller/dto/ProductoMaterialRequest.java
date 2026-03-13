package com.calzado.calzado_system.controller.dto;

public class ProductoMaterialRequest {

    private Long materialId;
    private Double cantidad;

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