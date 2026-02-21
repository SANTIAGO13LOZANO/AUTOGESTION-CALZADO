package com.calzado.calzado_system.controller;

import com.calzado.calzado_system.controller.dto.MovimientoRequest;
import com.calzado.calzado_system.controller.dto.MovimientoResponse;
import com.calzado.calzado_system.entity.MovimientoInventario;
import com.calzado.calzado_system.service.MovimientoInventarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MovimientoInventarioController {

    private final MovimientoInventarioService service;

    public MovimientoInventarioController(MovimientoInventarioService service) {
        this.service = service;
    }

    // ============================
    // Registrar movimiento
    // POST /movimientos
    // ============================
    @PostMapping("/movimientos")
    public ResponseEntity<MovimientoResponse> registrar(@RequestBody MovimientoRequest request) {

        MovimientoInventario movimiento = service.registrarMovimiento(request);

        MovimientoResponse response = convertirAResponse(movimiento);

        return ResponseEntity.ok(response);
    }

    // ============================
    // Kardex por material
    // GET /materiales/{id}/movimientos
    // ============================
    @GetMapping("/materiales/{materialId}/movimientos")
    public ResponseEntity<List<MovimientoResponse>> obtenerPorMaterial(@PathVariable Long materialId) {

        List<MovimientoResponse> lista = service.obtenerPorMaterial(materialId)
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(lista);
    }

    // ============================
    // Conversión Entity → Response
    // ============================
    private MovimientoResponse convertirAResponse(MovimientoInventario mov) {
        MovimientoResponse r = new MovimientoResponse();
        r.setId(mov.getId());
        r.setMaterialId(mov.getMaterial().getId());
        r.setFecha(mov.getFecha());
        r.setTipo(mov.getTipo());
        r.setCantidad(mov.getCantidad());
        r.setReferencia(mov.getReferencia());
        r.setStockAnterior(mov.getStockAnterior());
        r.setStockPosterior(mov.getStockPosterior());
        return r;
    }
}