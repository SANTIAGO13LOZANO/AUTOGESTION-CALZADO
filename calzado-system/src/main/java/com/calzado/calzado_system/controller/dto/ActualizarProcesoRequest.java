package com.calzado.calzado_system.controller.dto;

import com.calzado.calzado_system.entity.EstadoProcesoProduccion;

public class ActualizarProcesoRequest {

    private EstadoProcesoProduccion estado;
    private String observaciones;

    public EstadoProcesoProduccion getEstado() {
        return estado;
    }

    public void setEstado(EstadoProcesoProduccion estado) {
        this.estado = estado;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}