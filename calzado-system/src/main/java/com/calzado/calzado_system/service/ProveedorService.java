package com.calzado.calzado_system.service;

import com.calzado.calzado_system.entity.Proveedor;
import com.calzado.calzado_system.repository.ProveedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedorService {

    private final ProveedorRepository repository;

    public ProveedorService(ProveedorRepository repository) {
        this.repository = repository;
    }

    // Crear
    public Proveedor crear(Proveedor proveedor) {
        if (proveedor == null) throw new IllegalArgumentException("Body requerido");
        if (proveedor.getNombre() == null || proveedor.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        return repository.save(proveedor);
    }

    // Listar
    public List<Proveedor> listar() {
        return repository.findAll();
    }

    // Obtener por ID
    public Optional<Proveedor> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    // Actualizar
    public Proveedor actualizar(Long id, Proveedor cambios) {
        Proveedor existente = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proveedor no encontrado: " + id));

        if (cambios.getNombre() != null && !cambios.getNombre().trim().isEmpty()) {
            existente.setNombre(cambios.getNombre());
        }
        if (cambios.getNit() != null) existente.setNit(cambios.getNit());
        if (cambios.getTelefono() != null) existente.setTelefono(cambios.getTelefono());
        if (cambios.getEmail() != null) existente.setEmail(cambios.getEmail());
        if (cambios.getDireccion() != null) existente.setDireccion(cambios.getDireccion());

        return repository.save(existente);
    }

    // Eliminar
    public boolean eliminar(Long id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }
}