package com.calzado.calzado_system.repository;

import com.calzado.calzado_system.entity.Compra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompraRepository extends JpaRepository<Compra, Long> {

   
    List<Compra> findByProveedorId(Long proveedorId);
}