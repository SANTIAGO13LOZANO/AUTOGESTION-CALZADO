package com.calzado.calzado_system.repository;

import com.calzado.calzado_system.entity.MovimientoInventario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovimientoInventarioRepository extends JpaRepository<MovimientoInventario, Long> {

    // Kardex: historial de movimientos por material (más recientes primero)
    List<MovimientoInventario> findByMaterialIdOrderByFechaDesc(Long materialId);
}