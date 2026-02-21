package com.calzado.calzado_system.controller.dto;

import com.calzado.calzado_system.entity.TipoMovimiento;

public class MovimientoRequest {

    private Long materialId;
    private TipoMovimiento tipo;
    private Double cantidad;
    private String referencia;

    public Long getMaterialId() { return materialId; }
    public void setMaterialId(Long materialId) { this.materialId = materialId; }

    public TipoMovimiento getTipo() { return tipo; }
    public void setTipo(TipoMovimiento tipo) { this.tipo = tipo; }

    public Double getCantidad() { return cantidad; }
    public void setCantidad(Double cantidad) { this.cantidad = cantidad; }

    public String getReferencia() { return referencia; }
    public void setReferencia(String referencia) { this.referencia = referencia; }
}