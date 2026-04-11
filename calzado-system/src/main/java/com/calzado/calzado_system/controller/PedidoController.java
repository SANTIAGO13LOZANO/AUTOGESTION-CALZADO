package com.calzado.calzado_system.controller;

import com.calzado.calzado_system.controller.dto.PedidoRequest;
import com.calzado.calzado_system.entity.EstadoPedido;
import com.calzado.calzado_system.entity.Pedido;
import com.calzado.calzado_system.entity.PedidoDetalle;
import com.calzado.calzado_system.service.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Pedido> crear(@RequestBody PedidoRequest request) {
        return ResponseEntity.ok(service.crearPedido(request));
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> listar() {
        return ResponseEntity.ok(service.listarPedidos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerPedido(id));
    }

    @GetMapping("/{id}/detalles")
    public ResponseEntity<List<PedidoDetalle>> detalles(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerDetalles(id));
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Pedido> actualizarEstado(
            @PathVariable Long id,
            @RequestParam EstadoPedido estado
    ) {
        return ResponseEntity.ok(service.actualizarEstado(id, estado));
    }
}