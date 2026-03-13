package com.calzado.calzado_system.repository;

import com.calzado.calzado_system.entity.CompraDetalle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompraDetalleRepository extends JpaRepository<CompraDetalle, Long> {

   
    List<CompraDetalle> findByCompraId(Long compraId);
}