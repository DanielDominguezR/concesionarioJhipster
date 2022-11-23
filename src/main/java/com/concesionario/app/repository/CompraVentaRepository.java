package com.concesionario.app.repository;

import com.concesionario.app.domain.CompraVenta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CompraVenta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompraVentaRepository extends JpaRepository<CompraVenta, Long> {

}
