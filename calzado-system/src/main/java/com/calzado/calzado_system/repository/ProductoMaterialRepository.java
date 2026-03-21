package com.calzado.calzado_system.repository;

import com.calzado.calzado_system.entity.ProductoMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductoMaterialRepository extends JpaRepository<ProductoMaterial, Long> {
    List<ProductoMaterial> findByProductoId(Long productoId);
    void deleteByProductoId(Long productoId);
}