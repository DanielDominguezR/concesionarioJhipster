package com.concesionario.app.repository;

import com.concesionario.app.domain.CompraVenta;
import com.concesionario.app.domain.Trabajador;
import com.concesionario.app.domain.VentasTotales;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Trabajador entity.

 */
@SuppressWarnings("unused")
@Repository
public interface TrabajadorRepository extends JpaRepository<Trabajador, Long> {

    @Query("SELECT COUNT(c) FROM CompraVenta c WHERE c.vendedor is not null group by c.vendedor")
    List<CompraVenta>findVentasTotales();

}
