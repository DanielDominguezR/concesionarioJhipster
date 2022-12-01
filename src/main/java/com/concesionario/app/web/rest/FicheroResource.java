package com.concesionario.app.web.rest;

import com.concesionario.app.domain.Fichero;
import com.concesionario.app.service.FicheroService;
import com.concesionario.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.models.Path;
import springfox.documentation.service.ResponseMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import javax.mail.internet.ContentType;



/**
 * REST controller for managing {@link com.concesionario.app.domain.Fichero}.
 */
@RestController
@RequestMapping("/api")
public class FicheroResource {

    private final Logger log = LoggerFactory.getLogger(FicheroResource.class);

    private static final String ENTITY_NAME = "fichero";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;


    @Value("${application.upload-dir}")
    public String ruta;


    private final FicheroService ficheroService;

    public FicheroResource(FicheroService ficheroService) {
        this.ficheroService = ficheroService;
    }

    /**
     * {@code POST  /ficheroes} : Create a new fichero.
     *
     * @param fichero the fichero to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fichero, or with status {@code 400 (Bad Request)} if the fichero has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ficheroes")
    public ResponseEntity<Fichero> createFichero(@RequestBody Fichero fichero) throws URISyntaxException {
        log.debug("REST request to save Fichero : {}", fichero);
        if (fichero.getId() != null) {
            throw new BadRequestAlertException("A new fichero cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fichero result = ficheroService.save(fichero);
        return ResponseEntity.created(new URI("/api/ficheroes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ficheroes} : Updates an existing fichero.
     *
     * @param fichero the fichero to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fichero,
     * or with status {@code 400 (Bad Request)} if the fichero is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fichero couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ficheroes")
    public ResponseEntity<Fichero> updateFichero(@RequestBody Fichero fichero) throws URISyntaxException {
        log.debug("REST request to update Fichero : {}", fichero);
        if (fichero.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fichero result = ficheroService.save(fichero);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fichero.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ficheroes} : get all the ficheroes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ficheroes in body.
     */
    @GetMapping("/ficheroes")
    public List<Fichero> getAllFicheroes() {
        log.debug("REST request to get all Ficheroes");
        return ficheroService.findAll();
    }

    /**
     * {@code GET  /ficheroes/:id} : get the "id" fichero.
     *
     * @param id the id of the fichero to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fichero, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ficheroes/{id}")
    public ResponseEntity<Fichero> getFichero(@PathVariable Long id) {
        log.debug("REST request to get Fichero : {}", id);
        Optional<Fichero> fichero = ficheroService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fichero);
    }

    /**
     * {@code DELETE  /ficheroes/:id} : delete the "id" fichero.
     *
     * @param id the id of the fichero to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ficheroes/{id}")
    public ResponseEntity<Void> deleteFichero(@PathVariable Long id) {
        log.debug("REST request to delete Fichero : {}", id);
        ficheroService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @PostMapping("/ficheroes/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
      String message = "";
      try {

        Fichero docu = new Fichero();
        docu.setNombre_fichero(file.getOriginalFilename());
        docu.setContentType("application/pdf");
        docu.setPath(ruta);
        ficheroService.store(docu);
        // Files.createDirectories(Paths.get(this.ruta));


        message = "Uploaded the file successfully: " + file.getOriginalFilename();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(0, message, null, null, null));
      } catch (Exception e) {
        message = "Could not upload the file: " + file.getOriginalFilename() + "!";
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(0, message, null, null, null));
      }
    }
}
