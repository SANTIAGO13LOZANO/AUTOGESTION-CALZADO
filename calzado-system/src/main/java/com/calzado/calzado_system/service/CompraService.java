package com.calzado.calzado_system.service;

import com.calzado.calzado_system.dto.CompraRequest;
import com.calzado.calzado_system.controller.dto.MovimientoRequest;
import com.calzado.calzado_system.entity.Compra;
import com.calzado.calzado_system.entity.CompraDetalle;
import com.calzado.calzado_system.entity.TipoMovimiento;
import com.calzado.calzado_system.repository.CompraDetalleRepository;
import com.calzado.calzado_system.repository.CompraRepository;
import com.calzado.calzado_system.repository.ProveedorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CompraService {

    private final CompraRepository compraRepository;
    private final CompraDetalleRepository detalleRepository;
    private final ProveedorRepository proveedorRepository;
    private final MovimientoInventarioService movimientoInventarioService;

    public CompraService(
            CompraRepository compraRepository,
            CompraDetalleRepository detalleRepository,
            ProveedorRepository proveedorRepository,
            MovimientoInventarioService movimientoInventarioService
    ) {
        this.compraRepository = compraRepository;
        this.detalleRepository = detalleRepository;
        this.proveedorRepository = proveedorRepository;
        this.movimientoInventarioService = movimientoInventarioService;
    }

    // Crear compra + detalles + entradas en kardex (actualiza stock automáticamente)
    @Transactional
    public Compra crearCompra(CompraRequest request) {

        // 1) Validaciones mínimas
        if (request.getProveedorId() == null) {
            throw new RuntimeException("proveedorId es obligatorio");
        }
        if (request.getDetalles() == null || request.getDetalles().isEmpty()) {
            throw new RuntimeException("La compra debe tener al menos 1 detalle");
        }

        // 2) Validar que exista el proveedor (para que no queden compras huérfanas)
        proveedorRepository.findById(request.getProveedorId())
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));

        // 3) Guardar cabecera compra
        Compra compra = new Compra();
        compra.setProveedorId(request.getProveedorId());
        compra.setReferencia(request.getReferencia());
        compra = compraRepository.save(compra);

        // 4) Guardar detalles + por cada detalle registrar ENTRADA en Kardex
        for (CompraRequest.CompraDetalleRequest d : request.getDetalles()) {

            if (d.getMaterialId() == null) throw new RuntimeException("materialId es obligatorio en detalle");
            if (d.getCantidad() == null || d.getCantidad() <= 0) throw new RuntimeException("cantidad debe ser > 0");
            if (d.getCostoUnitario() == null || d.getCostoUnitario() < 0) throw new RuntimeException("costoUnitario inválido");

            // 4.1 Guardar detalle
            CompraDetalle det = new CompraDetalle();
            det.setCompraId(compra.getId());
            det.setMaterialId(d.getMaterialId());
            det.setCantidad(d.getCantidad());
            det.setCostoUnitario(d.getCostoUnitario());
            detalleRepository.save(det);

            // 4.2 Registrar movimiento ENTRADA (esto actualiza stock automáticamente)
            MovimientoRequest mov = new MovimientoRequest();
            mov.setMaterialId(d.getMaterialId());
            mov.setTipo(TipoMovimiento.ENTRADA);
            mov.setCantidad(d.getCantidad());

            // referencia: si no mandan, la construimos
            String ref = (request.getReferencia() != null && !request.getReferencia().trim().isEmpty())
                    ? request.getReferencia()
                    : "COMPRA #" + compra.getId();

            mov.setReferencia(ref);

            movimientoInventarioService.registrarMovimiento(mov);
        }

        return compra;
    }

    public List<Compra> listar() {
        return compraRepository.findAll();
    }

    public Compra obtenerPorId(Long id) {
        return compraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada"));
    }

    public List<CompraDetalle> obtenerDetalles(Long compraId) {
        return detalleRepository.findByCompraId(compraId);
    }
}