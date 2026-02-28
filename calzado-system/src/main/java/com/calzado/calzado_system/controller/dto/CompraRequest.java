package com.calzado.calzado_system.dto;

import java.util.List;

public class CompraRequest {

    private Long proveedorId;
    private String referencia;
    private List<CompraDetalleRequest> detalles;

    public Long getProveedorId() { return proveedorId; }
    public void setProveedorId(Long proveedorId) { this.proveedorId = proveedorId; }

    public String getReferencia() { return referencia; }
    public void setReferencia(String referencia) { this.referencia = referencia; }

    public List<CompraDetalleRequest> getDetalles() { return detalles; }
    public void setDetalles(List<CompraDetalleRequest> detalles) { this.detalles = detalles; }

    public static class CompraDetalleRequest {
        private Long materialId;
        private Double cantidad;
        private Double costoUnitario;

        public Long getMaterialId() { return materialId; }
        public void setMaterialId(Long materialId) { this.materialId = materialId; }

        public Double getCantidad() { return cantidad; }
        public void setCantidad(Double cantidad) { this.cantidad = cantidad; }

        public Double getCostoUnitario() { return costoUnitario; }
        public void setCostoUnitario(Double costoUnitario) { this.costoUnitario = costoUnitario; }
    }
}