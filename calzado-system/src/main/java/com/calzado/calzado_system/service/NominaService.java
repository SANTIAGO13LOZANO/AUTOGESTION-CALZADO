package com.calzado.calzado_system.service;

import com.calzado.calzado_system.controller.dto.*;
import com.calzado.calzado_system.entity.*;
import com.calzado.calzado_system.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class NominaService {

    private final TarifaProcesoRepository tarifaRepository;
    private final RegistroTrabajoRepository registroRepository;
    private final EmpleadoRepository empleadoRepository;
    private final OrdenProduccionRepository ordenRepository;

    public NominaService(
            TarifaProcesoRepository tarifaRepository,
            RegistroTrabajoRepository registroRepository,
            EmpleadoRepository empleadoRepository,
            OrdenProduccionRepository ordenRepository
    ) {
        this.tarifaRepository = tarifaRepository;
        this.registroRepository = registroRepository;
        this.empleadoRepository = empleadoRepository;
        this.ordenRepository = ordenRepository;
    }

    @Transactional
    public TarifaProceso guardarTarifa(TarifaProcesoRequest request) {
        if (request.getTipoProceso() == null) {
            throw new RuntimeException("El tipo de proceso es obligatorio");
        }
        if (request.getValorUnidad() == null || request.getValorUnidad() <= 0) {
            throw new RuntimeException("La tarifa por unidad debe ser mayor a 0");
        }

        TarifaProceso tarifa = tarifaRepository.findByTipoProceso(request.getTipoProceso())
                .orElse(new TarifaProceso());

        tarifa.setTipoProceso(request.getTipoProceso());
        tarifa.setValorUnidad(request.getValorUnidad());

        return tarifaRepository.save(tarifa);
    }

    public List<TarifaProceso> listarTarifas() {
        return tarifaRepository.findAll();
    }

    @Transactional
    public RegistroTrabajoResponse registrarTrabajo(RegistroTrabajoRequest request) {
        if (request.getEmpleadoId() == null) {
            throw new RuntimeException("empleadoId es obligatorio");
        }
        if (request.getOrdenProduccionId() == null) {
            throw new RuntimeException("ordenProduccionId es obligatorio");
        }
        if (request.getTipoProceso() == null) {
            throw new RuntimeException("tipoProceso es obligatorio");
        }
        if (request.getUnidadesTrabajadas() == null || request.getUnidadesTrabajadas() <= 0) {
            throw new RuntimeException("Las unidades trabajadas deben ser mayores a 0");
        }

        Empleado empleado = empleadoRepository.findById(request.getEmpleadoId())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        if (!Boolean.TRUE.equals(empleado.getActivo())) {
            throw new RuntimeException("El empleado está inactivo");
        }

        ordenRepository.findById(request.getOrdenProduccionId())
                .orElseThrow(() -> new RuntimeException("Orden de producción no encontrada"));

        if (empleado.getProcesoPrincipal() != request.getTipoProceso()) {
            throw new RuntimeException("El proceso del trabajo no coincide con el proceso principal del empleado");
        }

        TarifaProceso tarifa = tarifaRepository.findByTipoProceso(request.getTipoProceso())
                .orElseThrow(() -> new RuntimeException("No existe tarifa configurada para ese proceso"));

        double pago = request.getUnidadesTrabajadas() * tarifa.getValorUnidad();

        RegistroTrabajo registro = new RegistroTrabajo();
        registro.setEmpleadoId(request.getEmpleadoId());
        registro.setOrdenProduccionId(request.getOrdenProduccionId());
        registro.setTipoProceso(request.getTipoProceso());
        registro.setUnidadesTrabajadas(request.getUnidadesTrabajadas());
        registro.setValorUnidadAplicado(tarifa.getValorUnidad());
        registro.setPagoCalculado(pago);
        registro.setObservaciones(request.getObservaciones());

        registro = registroRepository.save(registro);

        return toResponse(registro, empleado.getNombre());
    }

    public List<RegistroTrabajoResponse> listarRegistros() {
        List<RegistroTrabajo> registros = registroRepository.findAllByOrderByFechaRegistroDesc();
        List<RegistroTrabajoResponse> response = new ArrayList<>();

        for (RegistroTrabajo r : registros) {
            String nombre = empleadoRepository.findById(r.getEmpleadoId())
                    .map(Empleado::getNombre)
                    .orElse("Desconocido");
            response.add(toResponse(r, nombre));
        }

        return response;
    }

    public ResumenNominaEmpleadoResponse resumenEmpleado(Long empleadoId) {
        Empleado empleado = empleadoRepository.findById(empleadoId)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        List<RegistroTrabajo> registros = registroRepository.findByEmpleadoIdOrderByFechaRegistroDesc(empleadoId);

        int totalUnidades = 0;
        double totalPago = 0.0;
        List<RegistroTrabajoResponse> detalles = new ArrayList<>();

        for (RegistroTrabajo r : registros) {
            totalUnidades += r.getUnidadesTrabajadas();
            totalPago += r.getPagoCalculado();
            detalles.add(toResponse(r, empleado.getNombre()));
        }

        ResumenNominaEmpleadoResponse response = new ResumenNominaEmpleadoResponse();
        response.setEmpleadoId(empleado.getId());
        response.setEmpleadoNombre(empleado.getNombre());
        response.setTotalUnidades(totalUnidades);
        response.setTotalPago(totalPago);
        response.setDetalles(detalles);

        return response;
    }

    public CostoManoObraOrdenResponse costoManoObraPorOrden(Long ordenProduccionId) {
        ordenRepository.findById(ordenProduccionId)
                .orElseThrow(() -> new RuntimeException("Orden de producción no encontrada"));

        List<RegistroTrabajo> registros = registroRepository.findByOrdenProduccionIdOrderByFechaRegistroDesc(ordenProduccionId);

        int totalUnidades = 0;
        double totalPago = 0.0;
        List<RegistroTrabajoResponse> detalles = new ArrayList<>();

        for (RegistroTrabajo r : registros) {
            String nombre = empleadoRepository.findById(r.getEmpleadoId())
                    .map(Empleado::getNombre)
                    .orElse("Desconocido");

            totalUnidades += r.getUnidadesTrabajadas();
            totalPago += r.getPagoCalculado();
            detalles.add(toResponse(r, nombre));
        }

        CostoManoObraOrdenResponse response = new CostoManoObraOrdenResponse();
        response.setOrdenProduccionId(ordenProduccionId);
        response.setTotalUnidades(totalUnidades);
        response.setTotalPago(totalPago);
        response.setDetalles(detalles);

        return response;
    }

    private RegistroTrabajoResponse toResponse(RegistroTrabajo registro, String nombreEmpleado) {
        RegistroTrabajoResponse response = new RegistroTrabajoResponse();
        response.setId(registro.getId());
        response.setEmpleadoId(registro.getEmpleadoId());
        response.setEmpleadoNombre(nombreEmpleado);
        response.setOrdenProduccionId(registro.getOrdenProduccionId());
        response.setTipoProceso(registro.getTipoProceso());
        response.setUnidadesTrabajadas(registro.getUnidadesTrabajadas());
        response.setValorUnidadAplicado(registro.getValorUnidadAplicado());
        response.setPagoCalculado(registro.getPagoCalculado());
        response.setFechaRegistro(registro.getFechaRegistro());
        response.setObservaciones(registro.getObservaciones());
        return response;
    }
}