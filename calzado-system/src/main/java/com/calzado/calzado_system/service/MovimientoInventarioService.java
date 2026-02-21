package com.calzado.calzado_system.service;

import com.calzado.calzado_system.controller.dto.MovimientoRequest;
import com.calzado.calzado_system.entity.Material;
import com.calzado.calzado_system.entity.MovimientoInventario;
import com.calzado.calzado_system.entity.TipoMovimiento;
import com.calzado.calzado_system.repository.MaterialRepository;
import com.calzado.calzado_system.repository.MovimientoInventarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MovimientoInventarioService {

    private final MovimientoInventarioRepository movimientoRepository;
    private final MaterialRepository materialRepository;

    public MovimientoInventarioService(
            MovimientoInventarioRepository movimientoRepository,
            MaterialRepository materialRepository) {
        this.movimientoRepository = movimientoRepository;
        this.materialRepository = materialRepository;
    }

    // Registrar movimiento (ENTRADA o SALIDA)
    @Transactional
    public MovimientoInventario registrarMovimiento(MovimientoRequest request) {

        // 1. Validaciones básicas
        if (request.getMaterialId() == null) {
            throw new RuntimeException("materialId es obligatorio");
        }

        if (request.getCantidad() == null || request.getCantidad() <= 0) {
            throw new RuntimeException("La cantidad debe ser mayor a 0");
        }

        // 2. Buscar material
        Material material = materialRepository.findById(request.getMaterialId())
                .orElseThrow(() -> new RuntimeException("Material no encontrado"));

        double stockActual = material.getStock() == null ? 0.0 : material.getStock();
        double nuevoStock;

        // 3. Calcular nuevo stock
        if (request.getTipo() == TipoMovimiento.ENTRADA) {
            nuevoStock = stockActual + request.getCantidad();
        } else {
            nuevoStock = stockActual - request.getCantidad();

            if (nuevoStock < 0) {
                throw new RuntimeException("Stock insuficiente");
            }
        }

        // 4. Actualizar stock del material
        material.setStock(nuevoStock);
        materialRepository.save(material);

        // 5. Crear movimiento (kardex)
        MovimientoInventario movimiento = new MovimientoInventario();
        movimiento.setMaterial(material);
        movimiento.setFecha(LocalDateTime.now());
        movimiento.setTipo(request.getTipo());
        movimiento.setCantidad(request.getCantidad());
        movimiento.setReferencia(request.getReferencia());
        movimiento.setStockAnterior(stockActual);
        movimiento.setStockPosterior(nuevoStock);

        return movimientoRepository.save(movimiento);
    }

    // Historial por material (Kardex)
    public List<MovimientoInventario> obtenerPorMaterial(Long materialId) {
        return movimientoRepository.findByMaterialIdOrderByFechaDesc(materialId);
    }
}