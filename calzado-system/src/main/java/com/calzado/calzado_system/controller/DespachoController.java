package com.calzado.calzado_system.controller;

import com.calzado.calzado_system.controller.dto.DespachoRequest;
import com.calzado.calzado_system.entity.Despacho;
import com.calzado.calzado_system.service.DespachoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/despachos")
@CrossOrigin(origins = "*")
public class DespachoController {

    private final DespachoService service;

    public DespachoController(DespachoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Despacho> registrar(@RequestBody DespachoRequest request) {
        return ResponseEntity.ok(service.registrarDespacho(request));
    }

    @GetMapping("/pedido/{pedidoId}")
    public ResponseEntity<Despacho> obtenerPorPedido(@PathVariable Long pedidoId) {
        return ResponseEntity.ok(service.obtenerPorPedido(pedidoId));
    }
}