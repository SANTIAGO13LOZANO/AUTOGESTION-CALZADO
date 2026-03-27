package com.calzado.calzado_system.service;

import com.calzado.calzado_system.entity.Empleado;
import com.calzado.calzado_system.repository.EmpleadoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoService {

    private final EmpleadoRepository repository;

    public EmpleadoService(EmpleadoRepository repository) {
        this.repository = repository;
    }

    public Empleado crear(Empleado empleado) {
        if (empleado == null) {
            throw new RuntimeException("El empleado es obligatorio");
        }
        if (empleado.getNombre() == null || empleado.getNombre().trim().isEmpty()) {
            throw new RuntimeException("El nombre del empleado es obligatorio");
        }
        if (empleado.getProcesoPrincipal() == null) {
            throw new RuntimeException("El proceso principal es obligatorio");
        }

        return repository.save(empleado);
    }

    public List<Empleado> listarActivos() {
        return repository.findByActivoTrue();
    }

    public Empleado obtenerPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
    }

    public Empleado actualizar(Long id, Empleado cambios) {
        Empleado existente = obtenerPorId(id);

        if (cambios.getNombre() != null && !cambios.getNombre().trim().isEmpty()) {
            existente.setNombre(cambios.getNombre());
        }
        if (cambios.getProcesoPrincipal() != null) {
            existente.setProcesoPrincipal(cambios.getProcesoPrincipal());
        }
        if (cambios.getActivo() != null) {
            existente.setActivo(cambios.getActivo());
        }

        return repository.save(existente);
    }

    public boolean desactivar(Long id) {
        Empleado existente = obtenerPorId(id);
        existente.setActivo(false);
        repository.save(existente);
        return true;
    }
}