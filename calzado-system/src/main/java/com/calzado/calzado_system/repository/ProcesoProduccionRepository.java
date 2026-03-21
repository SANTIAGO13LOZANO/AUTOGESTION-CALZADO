package com.calzado.calzado_system.repository;

import com.calzado.calzado_system.entity.ProcesoProduccion;
import com.calzado.calzado_system.entity.TipoProcesoProduccion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProcesoProduccionRepository extends JpaRepository<ProcesoProduccion, Long> {

    List<ProcesoProduccion> findByOrdenProduccionIdOrderByOrdenSecuenciaAsc(Long ordenProduccionId);

    Optional<ProcesoProduccion> findByOrdenProduccionIdAndTipoProceso(Long ordenProduccionId, TipoProcesoProduccion tipoProceso);
}