package com.calzado.calzado_system.controller;

import com.calzado.calzado_system.controller.dto.*;
import com.calzado.calzado_system.entity.TarifaProceso;
import com.calzado.calzado_system.service.NominaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/nomina")
@CrossOrigin(origins = "*")
public class NominaController {

    private final NominaService service;

    public NominaController(NominaService service) {
        this.service = service;
    }

    @PostMapping("/tarifas")
    public ResponseEntity<TarifaProceso> guardarTarifa(@RequestBody TarifaProcesoRequest request) {
        return ResponseEntity.ok(service.guardarTarifa(request));
    }

    @GetMapping("/tarifas")
    public ResponseEntity<List<TarifaProceso>> listarTarifas() {
        return ResponseEntity.ok(service.listarTarifas());
    }

    @PostMapping("/trabajos")
    public ResponseEntity<RegistroTrabajoResponse> registrarTrabajo(@RequestBody RegistroTrabajoRequest request) {
        return ResponseEntity.ok(service.registrarTrabajo(request));
    }

    @GetMapping("/trabajos")
    public ResponseEntity<List<RegistroTrabajoResponse>> listarTrabajos() {
        return ResponseEntity.ok(service.listarRegistros());
    }

    @GetMapping("/empleados/{empleadoId}/resumen")
    public ResponseEntity<ResumenNominaEmpleadoResponse> resumenEmpleado(@PathVariable Long empleadoId) {
        return ResponseEntity.ok(service.resumenEmpleado(empleadoId));
    }

    @GetMapping("/ordenes/{ordenId}/mano-obra")
    public ResponseEntity<CostoManoObraOrdenResponse> costoManoObraOrden(@PathVariable Long ordenId) {
        return ResponseEntity.ok(service.costoManoObraPorOrden(ordenId));
    }
}