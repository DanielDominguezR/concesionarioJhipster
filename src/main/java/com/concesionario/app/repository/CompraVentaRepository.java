package com.concesionario.app.repository;

import com.concesionario.app.domain.CompraVenta;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CompraVenta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompraVentaRepository extends JpaRepository<CompraVenta, Long> {

    // @Query ("SELECT new com.concesionario.app.domain.VentasTotales(c.trabajador.id, COUNT(c)) FROM CompraVenta c WHERE c.trabajador is not null group by c.trabajador")
    // Page<CompraVenta> getventasTotales(Pageable pageable);

}
