package com.calzado.calzado_system.service;

import com.calzado.calzado_system.controller.dto.CostoProductoResponse;
import com.calzado.calzado_system.controller.dto.ProductoMaterialRequest;
import com.calzado.calzado_system.entity.Material;
import com.calzado.calzado_system.entity.Producto;
import com.calzado.calzado_system.entity.ProductoMaterial;
import com.calzado.calzado_system.repository.MaterialRepository;
import com.calzado.calzado_system.repository.ProductoMaterialRepository;
import com.calzado.calzado_system.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final ProductoMaterialRepository productoMaterialRepository;
    private final MaterialRepository materialRepository;

    public ProductoService(
            ProductoRepository productoRepository,
            ProductoMaterialRepository productoMaterialRepository,
            MaterialRepository materialRepository
    ) {
        this.productoRepository = productoRepository;
        this.productoMaterialRepository = productoMaterialRepository;
        this.materialRepository = materialRepository;
    }

    public Producto crear(Producto producto) {
        if (producto == null) {
            throw new RuntimeException("El producto es obligatorio");
        }
        if (producto.getNombre() == null || producto.getNombre().trim().isEmpty()) {
            throw new RuntimeException("El nombre del producto es obligatorio");
        }
        if (producto.getReferencia() == null || producto.getReferencia().trim().isEmpty()) {
            throw new RuntimeException("La referencia es obligatoria");
        }
        return productoRepository.save(producto);
    }

    public List<Producto> listar() {
        return productoRepository.findAll();
    }

    public Producto obtenerPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public Producto actualizar(Long id, Producto cambios) {
        Producto existente = obtenerPorId(id);

        if (cambios.getNombre() != null && !cambios.getNombre().trim().isEmpty()) {
            existente.setNombre(cambios.getNombre());
        }
        if (cambios.getReferencia() != null && !cambios.getReferencia().trim().isEmpty()) {
            existente.setReferencia(cambios.getReferencia());
        }
        if (cambios.getTalla() != null) {
            existente.setTalla(cambios.getTalla());
        }
        if (cambios.getColor() != null) {
            existente.setColor(cambios.getColor());
        }
        if (cambios.getPrecioSugerido() != null) {
            existente.setPrecioSugerido(cambios.getPrecioSugerido());
        }

        return productoRepository.save(existente);
    }

    public boolean eliminar(Long id) {
        if (!productoRepository.existsById(id)) {
            return false;
        }
        productoMaterialRepository.deleteByProductoId(id);
        productoRepository.deleteById(id);
        return true;
    }

    @Transactional
    public List<ProductoMaterial> reemplazarMateriales(Long productoId, List<ProductoMaterialRequest> materiales) {
        obtenerPorId(productoId);

        if (materiales == null || materiales.isEmpty()) {
            throw new RuntimeException("Debe enviar al menos un material");
        }

        productoMaterialRepository.deleteByProductoId(productoId);

        List<ProductoMaterial> guardados = new ArrayList<>();

        for (ProductoMaterialRequest req : materiales) {
            if (req.getMaterialId() == null) {
                throw new RuntimeException("materialId es obligatorio");
            }
            if (req.getCantidad() == null || req.getCantidad() <= 0) {
                throw new RuntimeException("La cantidad debe ser mayor a 0");
            }

            materialRepository.findById(req.getMaterialId())
                    .orElseThrow(() -> new RuntimeException("Material no encontrado: " + req.getMaterialId()));

            ProductoMaterial pm = new ProductoMaterial();
            pm.setProductoId(productoId);
            pm.setMaterialId(req.getMaterialId());
            pm.setCantidad(req.getCantidad());

            guardados.add(productoMaterialRepository.save(pm));
        }

        return guardados;
    }

    public List<ProductoMaterial> listarMaterialesPorProducto(Long productoId) {
        obtenerPorId(productoId);
        return productoMaterialRepository.findByProductoId(productoId);
    }

    public CostoProductoResponse calcularCosto(Long productoId) {
        Producto producto = obtenerPorId(productoId);
        List<ProductoMaterial> asociaciones = productoMaterialRepository.findByProductoId(productoId);

        CostoProductoResponse response = new CostoProductoResponse();
        response.setProductoId(producto.getId());
        response.setProducto(producto.getNombre());
        response.setReferencia(producto.getReferencia());

        List<CostoProductoResponse.DetalleCosto> detalles = new ArrayList<>();
        double total = 0.0;

        for (ProductoMaterial pm : asociaciones) {
            Material material = materialRepository.findById(pm.getMaterialId())
                    .orElseThrow(() -> new RuntimeException("Material no encontrado: " + pm.getMaterialId()));

            double costoMaterial = material.getCostoUnitario() == null ? 0.0 : material.getCostoUnitario();
            double subtotal = pm.getCantidad() * costoMaterial;
            total += subtotal;

            CostoProductoResponse.DetalleCosto detalle = new CostoProductoResponse.DetalleCosto();
            detalle.setMaterialId(material.getId());
            detalle.setMaterialNombre(material.getNombre());
            detalle.setUnidad(material.getUnidad());
            detalle.setCantidadProducto(pm.getCantidad());
            detalle.setCostoUnitarioMaterial(costoMaterial);
            detalle.setSubtotal(subtotal);

            detalles.add(detalle);
        }

        response.setDetalles(detalles);
        response.setCostoTotalMateriales(total);
        return response;
    }
}