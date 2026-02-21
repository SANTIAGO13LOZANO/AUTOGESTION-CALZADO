package com.calzado.calzado_system.repository;

import com.calzado.calzado_system.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Material, Long> {
}