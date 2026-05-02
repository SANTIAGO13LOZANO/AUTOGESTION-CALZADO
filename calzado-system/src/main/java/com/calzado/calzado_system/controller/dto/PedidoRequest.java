package com.calzado.calzado_system.controller.dto;

import java.util.List;

public class PedidoRequest {

    private Long clienteId;
    private String observaciones;
    private List<PedidoDetalleRequest> detalles;

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public List<PedidoDetalleRequest> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<PedidoDetalleRequest> detalles) {
        this.detalles = detalles;
    }
}