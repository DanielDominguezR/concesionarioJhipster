package com.concesionario.app.repository;

import com.concesionario.app.domain.Fichero;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Fichero entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FicheroRepository extends JpaRepository<Fichero, Long> {

}
