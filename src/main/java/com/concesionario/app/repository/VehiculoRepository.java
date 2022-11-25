package com.concesionario.app.repository;

import com.concesionario.app.domain.Vehiculo;
import com.concesionario.app.domain.enumeration.Tipo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Vehiculo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {

    @Query("SELECT t From Vehiculo t WHERE t.tipo = ?1 ")

    Page<Vehiculo> getCarsType(Tipo tipo, Pageable pageable);

    // @Query("SELECT c From coche t LEFT JOIN c.venta v WHERE v IS null")
    // Page<Vehiculo> getDisponibles(Pageable pageable);

}
