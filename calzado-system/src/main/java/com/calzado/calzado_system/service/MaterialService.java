package com.calzado.calzado_system.service;

import com.calzado.calzado_system.entity.Material;
import com.calzado.calzado_system.repository.MaterialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {

    private final MaterialRepository repository;

    public MaterialService(MaterialRepository repository) {
        this.repository = repository;
    }

    public Material crear(Material material) {
        return repository.save(material);
    }

    public List<Material> listar() {
        return repository.findAll();
    }

    public Material obtener(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Material actualizar(Long id, Material cambios) {
        Material actual = repository.findById(id).orElse(null);
        if (actual == null) return null;

        actual.setNombre(cambios.getNombre());
        actual.setUnidad(cambios.getUnidad());
        actual.setStock(cambios.getStock());
        actual.setCostoUnitario(cambios.getCostoUnitario());

        return repository.save(actual);
    }

    public boolean eliminar(Long id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }

    public Material ajustarStock(Long id, Double cantidad) {
    Material actual = repository.findById(id).orElse(null);
    if (actual == null) return null;

    double nuevoStock = actual.getStock() + cantidad;
    if (nuevoStock < 0) return null; // evita stock negativo

    actual.setStock(nuevoStock);
    return repository.save(actual);
}
}