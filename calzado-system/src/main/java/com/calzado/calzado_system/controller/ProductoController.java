package com.calzado.calzado_system.controller;

import com.calzado.calzado_system.controller.dto.CostoProductoResponse;
import com.calzado.calzado_system.controller.dto.ProductoMaterialRequest;
import com.calzado.calzado_system.entity.Producto;
import com.calzado.calzado_system.entity.ProductoMaterial;
import com.calzado.calzado_system.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto producto) {
        return ResponseEntity.ok(service.crear(producto));
    }

    @GetMapping
    public ResponseEntity<List<Producto>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable Long id, @RequestBody Producto cambios) {
        return ResponseEntity.ok(service.actualizar(id, cambios));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean ok = service.eliminar(id);
        if (!ok) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/materiales")
    public ResponseEntity<List<ProductoMaterial>> guardarMateriales(
            @PathVariable Long id,
            @RequestBody List<ProductoMaterialRequest> materiales
    ) {
        return ResponseEntity.ok(service.reemplazarMateriales(id, materiales));
    }

    @GetMapping("/{id}/materiales")
    public ResponseEntity<List<ProductoMaterial>> listarMateriales(@PathVariable Long id) {
        return ResponseEntity.ok(service.listarMaterialesPorProducto(id));
    }

    @GetMapping("/{id}/costo")
    public ResponseEntity<CostoProductoResponse> calcularCosto(@PathVariable Long id) {
        return ResponseEntity.ok(service.calcularCosto(id));
    }
}