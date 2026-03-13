package com.calzado.calzado_system.controller.dto;

import java.util.List;

public class CostoProductoResponse {

    private Long productoId;
    private String producto;
    private String referencia;
    private Double costoTotalMateriales;
    private List<DetalleCosto> detalles;

    public static class DetalleCosto {
        private Long materialId;
        private String materialNombre;
        private String unidad;
        private Double cantidadProducto;
        private Double costoUnitarioMaterial;
        private Double subtotal;

        public Long getMaterialId() {
            return materialId;
        }

        public void setMaterialId(Long materialId) {
            this.materialId = materialId;
        }

        public String getMaterialNombre() {
            return materialNombre;
        }

        public void setMaterialNombre(String materialNombre) {
            this.materialNombre = materialNombre;
        }

        public String getUnidad() {
            return unidad;
        }

        public void setUnidad(String unidad) {
            this.unidad = unidad;
        }

        public Double getCantidadProducto() {
            return cantidadProducto;
        }

        public void setCantidadProducto(Double cantidadProducto) {
            this.cantidadProducto = cantidadProducto;
        }

        public Double getCostoUnitarioMaterial() {
            return costoUnitarioMaterial;
        }

        public void setCostoUnitarioMaterial(Double costoUnitarioMaterial) {
            this.costoUnitarioMaterial = costoUnitarioMaterial;
        }

        public Double getSubtotal() {
            return subtotal;
        }

        public void setSubtotal(Double subtotal) {
            this.subtotal = subtotal;
        }
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public Double getCostoTotalMateriales() {
        return costoTotalMateriales;
    }

    public void setCostoTotalMateriales(Double costoTotalMateriales) {
        this.costoTotalMateriales = costoTotalMateriales;
    }

    public List<DetalleCosto> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleCosto> detalles) {
        this.detalles = detalles;
    }
}