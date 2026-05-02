package com.calzado.calzado_system.service;

import com.calzado.calzado_system.controller.dto.DespachoRequest;
import com.calzado.calzado_system.entity.Despacho;
import com.calzado.calzado_system.entity.EstadoPedido;
import com.calzado.calzado_system.entity.Pedido;
import com.calzado.calzado_system.repository.DespachoRepository;
import com.calzado.calzado_system.repository.PedidoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DespachoService {

    private final DespachoRepository despachoRepository;
    private final PedidoRepository pedidoRepository;

    public DespachoService(DespachoRepository despachoRepository, PedidoRepository pedidoRepository) {
        this.despachoRepository = despachoRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @Transactional
    public Despacho registrarDespacho(DespachoRequest request) {
        if (request.getPedidoId() == null) {
            throw new RuntimeException("pedidoId es obligatorio");
        }

        Pedido pedido = pedidoRepository.findById(request.getPedidoId())
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        if (pedido.getEstado() != EstadoPedido.LISTO) {
            throw new RuntimeException("Solo se puede despachar un pedido en estado LISTO");
        }

        despachoRepository.findByPedidoId(request.getPedidoId()).ifPresent(d -> {
            throw new RuntimeException("Ese pedido ya fue despachado");
        });

        Despacho despacho = new Despacho();
        despacho.setPedidoId(request.getPedidoId());
        despacho.setTransporte(request.getTransporte());
        despacho.setDestinatario(request.getDestinatario());
        despacho.setResponsable(request.getResponsable());
        despacho.setObservaciones(request.getObservaciones());

        despacho = despachoRepository.save(despacho);

        pedido.setEstado(EstadoPedido.DESPACHADO);
        pedidoRepository.save(pedido);

        return despacho;
    }

    public Despacho obtenerPorPedido(Long pedidoId) {
        return despachoRepository.findByPedidoId(pedidoId)
                .orElseThrow(() -> new RuntimeException("No existe despacho para ese pedido"));
    }
}