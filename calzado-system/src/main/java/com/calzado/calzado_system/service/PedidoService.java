package com.calzado.calzado_system.service;

import com.calzado.calzado_system.controller.dto.PedidoDetalleRequest;
import com.calzado.calzado_system.controller.dto.PedidoRequest;
import com.calzado.calzado_system.entity.*;
import com.calzado.calzado_system.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final PedidoDetalleRepository detalleRepository;
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;

    public PedidoService(
            PedidoRepository pedidoRepository,
            PedidoDetalleRepository detalleRepository,
            ClienteRepository clienteRepository,
            ProductoRepository productoRepository
    ) {
        this.pedidoRepository = pedidoRepository;
        this.detalleRepository = detalleRepository;
        this.clienteRepository = clienteRepository;
        this.productoRepository = productoRepository;
    }

    @Transactional
    public Pedido crearPedido(PedidoRequest request) {
        if (request.getClienteId() == null) {
            throw new RuntimeException("clienteId es obligatorio");
        }

        clienteRepository.findById(request.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        if (request.getDetalles() == null || request.getDetalles().isEmpty()) {
            throw new RuntimeException("El pedido debe tener al menos un detalle");
        }

        Pedido pedido = new Pedido();
        pedido.setClienteId(request.getClienteId());
        pedido.setObservaciones(request.getObservaciones());
        pedido.setEstado(EstadoPedido.PENDIENTE);

        pedido = pedidoRepository.save(pedido);

        for (PedidoDetalleRequest d : request.getDetalles()) {
            if (d.getProductoId() == null) {
                throw new RuntimeException("productoId es obligatorio en el detalle");
            }
            if (d.getCantidad() == null || d.getCantidad() <= 0) {
                throw new RuntimeException("La cantidad del detalle debe ser mayor a 0");
            }

            productoRepository.findById(d.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado en detalle"));

            PedidoDetalle detalle = new PedidoDetalle();
            detalle.setPedidoId(pedido.getId());
            detalle.setProductoId(d.getProductoId());
            detalle.setCantidad(d.getCantidad());
            detalle.setTalla(d.getTalla());
            detalle.setObservaciones(d.getObservaciones());

            detalleRepository.save(detalle);
        }

        return pedido;
    }

    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }

    public Pedido obtenerPedido(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
    }

    public List<PedidoDetalle> obtenerDetalles(Long pedidoId) {
        obtenerPedido(pedidoId);
        return detalleRepository.findByPedidoId(pedidoId);
    }

    @Transactional
    public Pedido actualizarEstado(Long pedidoId, EstadoPedido estado) {
        Pedido pedido = obtenerPedido(pedidoId);
        pedido.setEstado(estado);
        return pedidoRepository.save(pedido);
    }
}