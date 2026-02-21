package com.calzado.calzado_system.controller.dto;

import com.calzado.calzado_system.entity.TipoMovimiento;
import java.time.LocalDateTime;

public class MovimientoResponse {

    private Long id;
    private Long materialId;
    private LocalDateTime fecha;
    private TipoMovimiento tipo;
    private Double cantidad;
    private String referencia;
    private Double stockAnterior;
    private Double stockPosterior;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getMaterialId() { return materialId; }
    public void setMaterialId(Long materialId) { this.materialId = materialId; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public TipoMovimiento getTipo() { return tipo; }
    public void setTipo(TipoMovimiento tipo) { this.tipo = tipo; }

    public Double getCantidad() { return cantidad; }
    public void setCantidad(Double cantidad) { this.cantidad = cantidad; }

    public String getReferencia() { return referencia; }
    public void setReferencia(String referencia) { this.referencia = referencia; }

    public Double getStockAnterior() { return stockAnterior; }
    public void setStockAnterior(Double stockAnterior) { this.stockAnterior = stockAnterior; }

    public Double getStockPosterior() { return stockPosterior; }
    public void setStockPosterior(Double stockPosterior) { this.stockPosterior = stockPosterior; }
}