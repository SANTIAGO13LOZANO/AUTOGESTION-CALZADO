package com.calzado.calzado_system.controller;

import com.calzado.calzado_system.controller.dto.ActualizarProcesoRequest;
import com.calzado.calzado_system.controller.dto.OrdenProduccionRequest;
import com.calzado.calzado_system.entity.OrdenProduccion;
import com.calzado.calzado_system.entity.ProcesoProduccion;
import com.calzado.calzado_system.service.ProduccionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produccion")
@CrossOrigin(origins = "*")
public class ProduccionController {

    private final ProduccionService service;

    public ProduccionController(ProduccionService service) {
        this.service = service;
    }

    @PostMapping("/ordenes")
    public ResponseEntity<OrdenProduccion> crearOrden(@RequestBody OrdenProduccionRequest request) {
        return ResponseEntity.ok(service.crearOrden(request));
    }

    @GetMapping("/ordenes")
    public ResponseEntity<List<OrdenProduccion>> listarOrdenes() {
        return ResponseEntity.ok(service.listarOrdenes());
    }

    @GetMapping("/ordenes/{id}")
    public ResponseEntity<OrdenProduccion> obtenerOrden(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerOrdenPorId(id));
    }

    @GetMapping("/ordenes/{id}/procesos")
    public ResponseEntity<List<ProcesoProduccion>> obtenerProcesos(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerProcesosPorOrden(id));
    }

    @PutMapping("/procesos/{id}")
    public ResponseEntity<ProcesoProduccion> actualizarProceso(
            @PathVariable Long id,
            @RequestBody ActualizarProcesoRequest request
    ) {
        return ResponseEntity.ok(service.actualizarProceso(id, request));
    }
}