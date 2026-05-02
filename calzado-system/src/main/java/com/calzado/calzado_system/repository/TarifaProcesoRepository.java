package com.calzado.calzado_system.repository;

import com.calzado.calzado_system.entity.TarifaProceso;
import com.calzado.calzado_system.entity.TipoProcesoProduccion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TarifaProcesoRepository extends JpaRepository<TarifaProceso, Long> {
    Optional<TarifaProceso> findByTipoProceso(TipoProcesoProduccion tipoProceso);
}