package com.concesionario.app.service;

import com.concesionario.app.domain.GestorFichero;
import com.concesionario.app.repository.GestorFicheroRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link GestorFichero}.
 */
@Service
@Transactional
public class GestorFicheroService {

    private final Logger log = LoggerFactory.getLogger(GestorFicheroService.class);

    private final GestorFicheroRepository gestorFicheroRepository;

    public GestorFicheroService(GestorFicheroRepository gestorFicheroRepository) {
        this.gestorFicheroRepository = gestorFicheroRepository;
    }

    /**
     * Save a gestorFichero.
     *
     * @param gestorFichero the entity to save.
     * @return the persisted entity.
     */
    public GestorFichero save(GestorFichero gestorFichero) {
        log.debug("Request to save GestorFichero : {}", gestorFichero);
        return gestorFicheroRepository.save(gestorFichero);
    }

    /**
     * Get all the gestorFicheroes.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<GestorFichero> findAll() {
        log.debug("Request to get all GestorFicheroes");
        return gestorFicheroRepository.findAll();
    }


    /**
     * Get one gestorFichero by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<GestorFichero> findOne(Long id) {
        log.debug("Request to get GestorFichero : {}", id);
        return gestorFicheroRepository.findById(id);
    }

    /**
     * Delete the gestorFichero by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete GestorFichero : {}", id);
        gestorFicheroRepository.deleteById(id);
    }
}
