package com.concesionario.app.repository;

import com.concesionario.app.domain.GestorFichero;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GestorFichero entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GestorFicheroRepository extends JpaRepository<GestorFichero, Long> {

}
