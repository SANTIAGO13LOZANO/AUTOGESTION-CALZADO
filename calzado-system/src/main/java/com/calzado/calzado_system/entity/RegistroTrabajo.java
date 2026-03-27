package com.calzado.calzado_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "registro_trabajo")
public class RegistroTrabajo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long empleadoId;

    @Column(nullable = false)
    private Long ordenProduccionId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoProcesoProduccion tipoProceso;

    @Column(nullable = false)
    private Integer unidadesTrabajadas;

    @Column(nullable = false)
    private Double valorUnidadAplicado;

    @Column(nullable = false)
    private Double pagoCalculado;

    @Column(nullable = false)
    private LocalDateTime fechaRegistro;

    private String observaciones;

    public RegistroTrabajo() {
        this.fechaRegistro = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

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