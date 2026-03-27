package com.calzado.calzado_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "proceso_produccion")
public class ProcesoProduccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long ordenProduccionId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoProcesoProduccion tipoProceso;

    private Long empleadoId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoProcesoProduccion estado;

    @Column(nullable = false)
    private Integer ordenSecuencia;

    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private String observaciones;

    public ProcesoProduccion() {
        this.estado = EstadoProcesoProduccion.PENDIENTE;
    }

    public Long getId() {
        return id;
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

    public Long getEmpleadoId() {
        return empleadoId;
    }

    public void setEmpleadoId(Long empleadoId) {
        this.empleadoId = empleadoId;
    }

    public EstadoProcesoProduccion getEstado() {
        return estado;
    }

    public void setEstado(EstadoProcesoProduccion estado) {
        this.estado = estado;
    }

    public Integer getOrdenSecuencia() {
        return ordenSecuencia;
    }

    public void setOrdenSecuencia(Integer ordenSecuencia) {
        this.ordenSecuencia = ordenSecuencia;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}