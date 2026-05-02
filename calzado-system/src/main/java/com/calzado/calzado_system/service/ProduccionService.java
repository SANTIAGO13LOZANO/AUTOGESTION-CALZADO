package com.calzado.calzado_system.service;

import com.calzado.calzado_system.controller.dto.ActualizarProcesoRequest;
import com.calzado.calzado_system.controller.dto.OrdenProduccionRequest;
import com.calzado.calzado_system.entity.*;
import com.calzado.calzado_system.repository.EmpleadoRepository;
import com.calzado.calzado_system.repository.OrdenProduccionRepository;
import com.calzado.calzado_system.repository.ProcesoProduccionRepository;
import com.calzado.calzado_system.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class ProduccionService {

    private final OrdenProduccionRepository ordenRepository;
    private final ProcesoProduccionRepository procesoRepository;
    private final EmpleadoRepository empleadoRepository;
    private final ProductoRepository productoRepository;

    public ProduccionService(
            OrdenProduccionRepository ordenRepository,
            ProcesoProduccionRepository procesoRepository,
            EmpleadoRepository empleadoRepository,
            ProductoRepository productoRepository
    ) {
        this.ordenRepository = ordenRepository;
        this.procesoRepository = procesoRepository;
        this.empleadoRepository = empleadoRepository;
        this.productoRepository = productoRepository;
    }

    private final List<TipoProcesoProduccion> flujo = Arrays.asList(
            TipoProcesoProduccion.COMPRA,
            TipoProcesoProduccion.CORTE,
            TipoProcesoProduccion.GUARNECIDA,
            TipoProcesoProduccion.SOLADURA,
            TipoProcesoProduccion.COSIDA,
            TipoProcesoProduccion.EMPLANTILLADA,
            TipoProcesoProduccion.EMPAQUE
    );

    @Transactional
    public OrdenProduccion crearOrden(OrdenProduccionRequest request) {
        if (request.getProductoId() == null) {
            throw new RuntimeException("productoId es obligatorio");
        }
        if (request.getCantidad() == null || request.getCantidad() <= 0) {
            throw new RuntimeException("La cantidad debe ser mayor a 0");
        }

        productoRepository.findById(request.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        OrdenProduccion orden = new OrdenProduccion();
        orden.setProductoId(request.getProductoId());
        orden.setCantidad(request.getCantidad());
        orden.setObservaciones(request.getObservaciones());
        orden.setEstado(EstadoOrdenProduccion.CREADA);

        orden = ordenRepository.save(orden);

        int secuencia = 1;
        for (TipoProcesoProduccion tipo : flujo) {
            ProcesoProduccion proceso = new ProcesoProduccion();
            proceso.setOrdenProduccionId(orden.getId());
            proceso.setTipoProceso(tipo);
            proceso.setOrdenSecuencia(secuencia);
            proceso.setEstado(EstadoProcesoProduccion.PENDIENTE);

            empleadoRepository.findFirstByProcesoPrincipalAndActivoTrue(tipo)
                    .ifPresent(emp -> proceso.setEmpleadoId(emp.getId()));

            procesoRepository.save(proceso);
            secuencia++;
        }

        return orden;
    }

    public List<OrdenProduccion> listarOrdenes() {
        return ordenRepository.findAll();
    }

    public OrdenProduccion obtenerOrdenPorId(Long id) {
        return ordenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden de producción no encontrada"));
    }

    public List<ProcesoProduccion> obtenerProcesosPorOrden(Long ordenId) {
        obtenerOrdenPorId(ordenId);
        return procesoRepository.findByOrdenProduccionIdOrderByOrdenSecuenciaAsc(ordenId);
    }

    @Transactional
    public ProcesoProduccion actualizarProceso(Long procesoId, ActualizarProcesoRequest request) {
        ProcesoProduccion proceso = procesoRepository.findById(procesoId)
                .orElseThrow(() -> new RuntimeException("Proceso no encontrado"));

        if (request.getEstado() == null) {
            throw new RuntimeException("El estado es obligatorio");
        }

        List<ProcesoProduccion> procesos = procesoRepository.findByOrdenProduccionIdOrderByOrdenSecuenciaAsc(proceso.getOrdenProduccionId());

        ProcesoProduccion procesoAnterior = null;
        for (int i = 0; i < procesos.size(); i++) {
            if (procesos.get(i).getId().equals(proceso.getId()) && i > 0) {
                procesoAnterior = procesos.get(i - 1);
                break;
            }
        }

        // Validar secuencia: no puede avanzar si la anterior no terminó
        if ((request.getEstado() == EstadoProcesoProduccion.EN_PROCESO
                || request.getEstado() == EstadoProcesoProduccion.TERMINADO)
                && procesoAnterior != null
                && procesoAnterior.getEstado() != EstadoProcesoProduccion.TERMINADO) {
            throw new RuntimeException("No se puede avanzar este proceso hasta terminar el anterior");
        }

        proceso.setEstado(request.getEstado());
        proceso.setObservaciones(request.getObservaciones());

        if (request.getEstado() == EstadoProcesoProduccion.EN_PROCESO && proceso.getFechaInicio() == null) {
            proceso.setFechaInicio(LocalDateTime.now());
        }

        if (request.getEstado() == EstadoProcesoProduccion.TERMINADO) {
            if (proceso.getFechaInicio() == null) {
                proceso.setFechaInicio(LocalDateTime.now());
            }
            proceso.setFechaFin(LocalDateTime.now());
        }

        proceso = procesoRepository.save(proceso);

        actualizarEstadoOrden(proceso.getOrdenProduccionId());

        return proceso;
    }

    private void actualizarEstadoOrden(Long ordenId) {
        OrdenProduccion orden = obtenerOrdenPorId(ordenId);
        List<ProcesoProduccion> procesos = procesoRepository.findByOrdenProduccionIdOrderByOrdenSecuenciaAsc(ordenId);

        boolean todosTerminados = procesos.stream()
                .allMatch(p -> p.getEstado() == EstadoProcesoProduccion.TERMINADO);

        boolean algunoIniciado = procesos.stream()
                .anyMatch(p -> p.getEstado() == EstadoProcesoProduccion.EN_PROCESO
                        || p.getEstado() == EstadoProcesoProduccion.TERMINADO);

        if (todosTerminados) {
            orden.setEstado(EstadoOrdenProduccion.TERMINADA);
        } else if (algunoIniciado) {
            orden.setEstado(EstadoOrdenProduccion.EN_PROCESO);
        } else {
            orden.setEstado(EstadoOrdenProduccion.CREADA);
        }

        ordenRepository.save(orden);
    }
}