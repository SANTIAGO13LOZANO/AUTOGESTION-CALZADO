package com.calzado.calzado_system.controller.dto;

import java.util.List;

public class ResumenNominaEmpleadoResponse {

    private Long empleadoId;
    private String empleadoNombre;
    private Integer totalUnidades;
    private Double totalPago;
    private List<RegistroTrabajoResponse> detalles;

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

    public Integer getTotalUnidades() {
        return totalUnidades;
    }

    public void setTotalUnidades(Integer totalUnidades) {
        this.totalUnidades = totalUnidades;
    }

    public Double getTotalPago() {
        return totalPago;
    }

    public void setTotalPago(Double totalPago) {
        this.totalPago = totalPago;
    }

    public List<RegistroTrabajoResponse> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<RegistroTrabajoResponse> detalles) {
        this.detalles = detalles;
    }
}