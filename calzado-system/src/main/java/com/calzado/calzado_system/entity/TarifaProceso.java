package com.calzado.calzado_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tarifa_proceso")
public class TarifaProceso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private TipoProcesoProduccion tipoProceso;

    @Column(nullable = false)
    private Double valorUnidad;

    public TarifaProceso() {
    }

    public Long getId() {
        return id;
    }

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