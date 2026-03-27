package com.calzado.calzado_system.repository;

import com.calzado.calzado_system.entity.Empleado;
import com.calzado.calzado_system.entity.TipoProcesoProduccion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    List<Empleado> findByActivoTrue();
    Optional<Empleado> findFirstByProcesoPrincipalAndActivoTrue(TipoProcesoProduccion procesoPrincipal);
}