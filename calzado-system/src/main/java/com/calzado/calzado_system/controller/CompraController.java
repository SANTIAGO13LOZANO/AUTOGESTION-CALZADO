package com.calzado.calzado_system.controller;

import com.calzado.calzado_system.dto.CompraRequest;
import com.calzado.calzado_system.entity.Compra;
import com.calzado.calzado_system.entity.CompraDetalle;
import com.calzado.calzado_system.service.CompraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compras")
public class CompraController {

    private final CompraService service;

    public CompraController(CompraService service) {
        this.service = service;
    }

    // Crear compra + detalles + entradas kardex
    @PostMapping
    public ResponseEntity<Compra> crear(@RequestBody CompraRequest request) {
        return ResponseEntity.ok(service.crearCompra(request));
    }

    // Listar compras
    @GetMapping
    public ResponseEntity<List<Compra>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    // Obtener compra por id
    @GetMapping("/{id}")
    public ResponseEntity<Compra> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    // Obtener detalles de compra
    @GetMapping("/{id}/detalles")
    public ResponseEntity<List<CompraDetalle>> detalles(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerDetalles(id));
    }
}