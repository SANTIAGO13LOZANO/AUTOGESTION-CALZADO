package com.calzado.calzado_system.controller.dto;

import com.calzado.calzado_system.entity.TipoProcesoProduccion;

public class TarifaProcesoRequest {

    private TipoProcesoProduccion tipoProceso;
    private Double valorUnidad;

    public TipoProcesoProduccion getTipoProceso() {
        return tipoProceso;
    }

    public void setTipoProceso(TipoProcesoProduccion tipoProceso) {
        this.tipoProceso = tipoProceso;
    }

    public Double getValorUnidad() {
        return valorUnidad;
    }

    public void setValorUnidad(Double valorUnidad) {
        this.valorUnidad = valorUnidad;
    }
}