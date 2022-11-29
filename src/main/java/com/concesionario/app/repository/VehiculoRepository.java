package com.concesionario.app.repository;

import com.concesionario.app.domain.Vehiculo;
import com.concesionario.app.domain.enumeration.Tipo;

import antlr.collections.List;

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

    @Query("select c from Vehiculo c where c.id not in (select v.vehiculo.id from CompraVenta v where v.vehiculo IS not null)")
    Page<Vehiculo> getDisponibles(Pageable pageable);

    @Query("select c from Vehiculo c where c.id in (select v.vehiculo.id from CompraVenta v where v.vehiculo IS not null)")
    Page<Vehiculo> getnoDisponibles(Pageable pageable);





}
