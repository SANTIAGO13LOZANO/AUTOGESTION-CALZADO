package com.calzado.calzado_system.repository;

import com.calzado.calzado_system.entity.RegistroTrabajo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistroTrabajoRepository extends JpaRepository<RegistroTrabajo, Long> {

    List<RegistroTrabajo> findByEmpleadoIdOrderByFechaRegistroDesc(Long empleadoId);

    List<RegistroTrabajo> findByOrdenProduccionIdOrderByFechaRegistroDesc(Long ordenProduccionId);

    List<RegistroTrabajo> findAllByOrderByFechaRegistroDesc();
}