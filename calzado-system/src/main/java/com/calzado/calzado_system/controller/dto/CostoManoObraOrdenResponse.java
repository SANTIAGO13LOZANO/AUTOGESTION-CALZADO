package com.calzado.calzado_system.controller.dto;

import java.util.List;

public class CostoManoObraOrdenResponse {

    private Long ordenProduccionId;
    private Integer totalUnidades;
    private Double totalPago;
    private List<RegistroTrabajoResponse> detalles;

    public Long getOrdenProduccionId() {
        return ordenProduccionId;
    }

    public void setOrdenProduccionId(Long ordenProduccionId) {
        this.ordenProduccionId = ordenProduccionId;
    }

    public Integer getTotalUnidades() {
        return totalUnidades;
    }

    public void setTotalUnidades(Integer totalUnidades) {
        this.totalUnidades = totalUnidades;
    }

    public Double getTotalPago() {
        return totalPago;
    }

    public void setTotalPago(Double totalPago) {
        this.totalPago = totalPago;
    }

    public List<RegistroTrabajoResponse> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<RegistroTrabajoResponse> detalles) {
        this.detalles = detalles;
    }
}