package com.concesionario.app.service;

import com.concesionario.app.domain.Fichero;
import com.concesionario.app.repository.FicheroRepository;
import com.concesionario.app.service.dto.FicheroDTO;

import io.jsonwebtoken.io.IOException;
import io.swagger.models.Path;

import org.springframework.beans.factory.annotation.Value;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;


/**
 * Service Implementation for managing {@link Fichero}.
 */
@Service
@Transactional
public class FicheroService {

    private final Logger log = LoggerFactory.getLogger(FicheroService.class);

    private final FicheroRepository ficheroRepository;

    @Value("${application.upload-dir}")
    public String ruta;

    public FicheroService(FicheroRepository ficheroRepository) {
        this.ficheroRepository = ficheroRepository;
    }

    /**
     * Save a fichero.
     *
     * @param fichero the entity to save.
     * @return the persisted entity.
     */
    public Fichero save(Fichero fichero) {
        log.debug("Request to save Fichero : {}", fichero);
        return ficheroRepository.save(fichero);
    }

    /**
     * Get all the ficheroes.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Fichero> findAll() {
        log.debug("Request to get all Ficheroes");
        return ficheroRepository.findAll();
    }


    /**
     * Get one fichero by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Fichero> findOne(Long id) {
        log.debug("Request to get Fichero : {}", id);
        return ficheroRepository.findById(id);
    }

    /**
     * Delete the fichero by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Fichero : {}", id);
        ficheroRepository.deleteById(id);
    }



    public void store(Fichero docu) {


        try {
            Files.createDirectories(Paths.get(docu.getPath()));
            log.debug(docu.getPath());
            ficheroRepository.save(docu);

          } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
              throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
          }

      }

    //   public FileDB getFile(String id) {
    //     return ficheroRepository.findById(id).get();
    //   }

    //   public Stream<FileDB> getAllFiles() {
    //     return fileDBRepository.findAll().stream();
    //   }


    }

