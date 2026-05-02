package com.calzado.calzado_system.controller.dto;

import com.calzado.calzado_system.entity.TipoProcesoProduccion;

public class RegistroTrabajoRequest {

    private Long empleadoId;
    private Long ordenProduccionId;
    private TipoProcesoProduccion tipoProceso;
    private Integer unidadesTrabajadas;
    private String observaciones;

    public Long getEmpleadoId() {
        return empleadoId;
    }

    public void setEmpleadoId(Long empleadoId) {
        this.empleadoId = empleadoId;
    }

    public Long getOrdenProduccionId() {
        return ordenProduccionId;
    }

    public void setOrdenProduccionId(Long ordenProduccionId) {
        this.ordenProduccionId = ordenProduccionId;
    }

    public TipoProcesoProduccion getTipoProceso() {
        return tipoProceso;
    }

    public void setTipoProceso(TipoProcesoProduccion tipoProceso) {
        this.tipoProceso = tipoProceso;
    }

    public Integer getUnidadesTrabajadas() {
        return unidadesTrabajadas;
    }

    public void setUnidadesTrabajadas(Integer unidadesTrabajadas) {
        this.unidadesTrabajadas = unidadesTrabajadas;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}