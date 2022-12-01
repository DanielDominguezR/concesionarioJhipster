package com.concesionario.app.web.rest;

import com.concesionario.app.domain.GestorFichero;
import com.concesionario.app.service.GestorFicheroService;
import com.concesionario.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.concesionario.app.domain.GestorFichero}.
 */
@RestController
@RequestMapping("/api")
public class GestorFicheroResource {

    private final Logger log = LoggerFactory.getLogger(GestorFicheroResource.class);

    private static final String ENTITY_NAME = "gestorFichero";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GestorFicheroService gestorFicheroService;

    public GestorFicheroResource(GestorFicheroService gestorFicheroService) {
        this.gestorFicheroService = gestorFicheroService;
    }

    /**
     * {@code POST  /gestor-ficheroes} : Create a new gestorFichero.
     *
     * @param gestorFichero the gestorFichero to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gestorFichero, or with status {@code 400 (Bad Request)} if the gestorFichero has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/gestor-ficheroes")
    public ResponseEntity<GestorFichero> createGestorFichero(@RequestBody GestorFichero gestorFichero) throws URISyntaxException {
        log.debug("REST request to save GestorFichero : {}", gestorFichero);
        if (gestorFichero.getId() != null) {
            throw new BadRequestAlertException("A new gestorFichero cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GestorFichero result = gestorFicheroService.save(gestorFichero);
        return ResponseEntity.created(new URI("/api/gestor-ficheroes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /gestor-ficheroes} : Updates an existing gestorFichero.
     *
     * @param gestorFichero the gestorFichero to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gestorFichero,
     * or with status {@code 400 (Bad Request)} if the gestorFichero is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gestorFichero couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/gestor-ficheroes")
    public ResponseEntity<GestorFichero> updateGestorFichero(@RequestBody GestorFichero gestorFichero) throws URISyntaxException {
        log.debug("REST request to update GestorFichero : {}", gestorFichero);
        if (gestorFichero.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GestorFichero result = gestorFicheroService.save(gestorFichero);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gestorFichero.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /gestor-ficheroes} : get all the gestorFicheroes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gestorFicheroes in body.
     */
    @GetMapping("/gestor-ficheroes")
    public List<GestorFichero> getAllGestorFicheroes() {
        log.debug("REST request to get all GestorFicheroes");
        return gestorFicheroService.findAll();
    }

    /**
     * {@code GET  /gestor-ficheroes/:id} : get the "id" gestorFichero.
     *
     * @param id the id of the gestorFichero to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gestorFichero, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/gestor-ficheroes/{id}")
    public ResponseEntity<GestorFichero> getGestorFichero(@PathVariable Long id) {
        log.debug("REST request to get GestorFichero : {}", id);
        Optional<GestorFichero> gestorFichero = gestorFicheroService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gestorFichero);
    }

    /**
     * {@code DELETE  /gestor-ficheroes/:id} : delete the "id" gestorFichero.
     *
     * @param id the id of the gestorFichero to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/gestor-ficheroes/{id}")
    public ResponseEntity<Void> deleteGestorFichero(@PathVariable Long id) {
        log.debug("REST request to delete GestorFichero : {}", id);
        gestorFicheroService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
