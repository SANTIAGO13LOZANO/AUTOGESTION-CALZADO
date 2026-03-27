package com.calzado.calzado_system.controller.dto;

import com.calzado.calzado_system.entity.TipoProcesoProduccion;

import java.time.LocalDateTime;

public class RegistroTrabajoResponse {

    private Long id;
    private Long empleadoId;
    private String empleadoNombre;
    private Long ordenProduccionId;
    private TipoProcesoProduccion tipoProceso;
    private Integer unidadesTrabajadas;
    private Double valorUnidadAplicado;
    private Double pagoCalculado;
    private LocalDateTime fechaRegistro;
    private String observaciones;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmpleadoId() {
        return empleadoId;
    }

    public void setEmpleadoId(Long empleadoId) {
        this.empleadoId = empleadoId;
    }

    public String getEmpleadoNombre() {
        return empleadoNombre;
    }

    public void setEmpleadoNombre(String empleadoNombre) {
        this.empleadoNombre = empleadoNombre;
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

    public Double getValorUnidadAplicado() {
        return valorUnidadAplicado;
    }

    public void setValorUnidadAplicado(Double valorUnidadAplicado) {
        this.valorUnidadAplicado = valorUnidadAplicado;
    }

    public Double getPagoCalculado() {
        return pagoCalculado;
    }

    public void setPagoCalculado(Double pagoCalculado) {
        this.pagoCalculado = pagoCalculado;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}