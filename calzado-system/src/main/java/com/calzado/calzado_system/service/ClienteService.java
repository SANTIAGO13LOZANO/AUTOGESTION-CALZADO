package com.calzado.calzado_system.service;

import com.calzado.calzado_system.entity.Cliente;
import com.calzado.calzado_system.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public Cliente crear(Cliente cliente) {
        if (cliente == null) {
            throw new RuntimeException("El cliente es obligatorio");
        }
        if (cliente.getNombre() == null || cliente.getNombre().trim().isEmpty()) {
            throw new RuntimeException("El nombre del cliente es obligatorio");
        }
        return repository.save(cliente);
    }

    public List<Cliente> listar() {
        return repository.findAll();
    }

    public Cliente obtenerPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    public Cliente actualizar(Long id, Cliente cambios) {
        Cliente existente = obtenerPorId(id);

        if (cambios.getNombre() != null && !cambios.getNombre().trim().isEmpty()) {
            existente.setNombre(cambios.getNombre());
        }
        if (cambios.getIdentificacion() != null) {
            existente.setIdentificacion(cambios.getIdentificacion());
        }
        if (cambios.getTelefono() != null) {
            existente.setTelefono(cambios.getTelefono());
        }
        if (cambios.getEmail() != null) {
            existente.setEmail(cambios.getEmail());
        }
        if (cambios.getDireccion() != null) {
            existente.setDireccion(cambios.getDireccion());
        }

        return repository.save(existente);
    }

    public boolean eliminar(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}