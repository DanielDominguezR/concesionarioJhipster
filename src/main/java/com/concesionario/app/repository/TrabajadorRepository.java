package com.concesionario.app.repository;

import com.concesionario.app.domain.CompraVenta;
import com.concesionario.app.domain.Trabajador;
import com.concesionario.app.domain.VentasTotales;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Trabajador entity.

 */
@SuppressWarnings("unused")
@Repository
public interface TrabajadorRepository extends JpaRepository<Trabajador, Long> {

    @Query("SELECT count(c) FROM CompraVenta c WHERE c.vendedor IS :Trabajador")
    Integer findVentasTotales(@Param("Trabajador") Trabajador trabajador);


}
