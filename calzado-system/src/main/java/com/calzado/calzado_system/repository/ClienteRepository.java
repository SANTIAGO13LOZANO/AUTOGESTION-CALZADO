package com.calzado.calzado_system.repository;

import com.calzado.calzado_system.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}