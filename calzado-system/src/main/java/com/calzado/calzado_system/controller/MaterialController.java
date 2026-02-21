package com.calzado.calzado_system.controller;

import com.calzado.calzado_system.entity.Material;
import com.calzado.calzado_system.service.MaterialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/materiales")
public class MaterialController {

    private final MaterialService service;

    public MaterialController(MaterialService service) {
        this.service = service;
    }

    // Crear
    @PostMapping
    public ResponseEntity<Material> crear(@RequestBody Material material) {
        return ResponseEntity.ok(service.crear(material));
    }

    // Listar
    @GetMapping
    public ResponseEntity<List<Material>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    // Obtener por id
    @GetMapping("/{id}")
    public ResponseEntity<Material> obtener(@PathVariable Long id) {
        Material material = service.obtener(id);
        if (material == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(material);
    }

    // Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Material> actualizar(@PathVariable Long id, @RequestBody Material cambios) {
        Material actualizado = service.actualizar(id, cambios);
        if (actualizado == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(actualizado);
    }

    // Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean ok = service.eliminar(id);
        if (!ok) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/stock")
public ResponseEntity<Material> ajustarStock(
        @PathVariable Long id,
        @RequestParam Double cantidad
) {
    Material actualizado = service.ajustarStock(id, cantidad);
    if (actualizado == null) return ResponseEntity.badRequest().build();
    return ResponseEntity.ok(actualizado);
}
}