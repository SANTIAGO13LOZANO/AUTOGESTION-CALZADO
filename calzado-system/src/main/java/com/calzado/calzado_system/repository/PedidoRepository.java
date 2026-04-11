package com.calzado.calzado_system.repository;

import com.calzado.calzado_system.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByClienteIdOrderByFechaCreacionDesc(Long clienteId);
}