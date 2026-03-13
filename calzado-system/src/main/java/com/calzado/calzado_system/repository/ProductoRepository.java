package com.calzado.calzado_system.repository;

import com.calzado.calzado_system.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}