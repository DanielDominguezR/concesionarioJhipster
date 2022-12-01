package com.concesionario.app.web.rest;

import com.concesionario.app.ConcesionarioApp;
import com.concesionario.app.domain.Fichero;
import com.concesionario.app.repository.FicheroRepository;
import com.concesionario.app.service.FicheroService;
import com.concesionario.app.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.concesionario.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link FicheroResource} REST controller.
 */
@SpringBootTest(classes = ConcesionarioApp.class)
public class FicheroResourceIT {

    private static final String DEFAULT_PATH = "AAAAAAAAAA";
    private static final String UPDATED_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE_FICHERO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_FICHERO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_TYPE = "BBBBBBBBBB";

    @Autowired
    private FicheroRepository ficheroRepository;

    @Autowired
    private FicheroService ficheroService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restFicheroMockMvc;

    private Fichero fichero;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FicheroResource ficheroResource = new FicheroResource(ficheroService);
        this.restFicheroMockMvc = MockMvcBuilders.standaloneSetup(ficheroResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fichero createEntity(EntityManager em) {
        Fichero fichero = new Fichero()
            .path(DEFAULT_PATH)
            .nombre_fichero(DEFAULT_NOMBRE_FICHERO)
            .contentType(DEFAULT_CONTENT_TYPE);
        return fichero;
    }

    @BeforeEach
    public void initTest() {
        fichero = createEntity(em);
    }

    @Test
    @Transactional
    public void createFichero() throws Exception {
        int databaseSizeBeforeCreate = ficheroRepository.findAll().size();

        // Create the Fichero
        restFicheroMockMvc.perform(post("/api/ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fichero)))
            .andExpect(status().isCreated());

        // Validate the Fichero in the database
        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeCreate + 1);
        Fichero testFichero = ficheroList.get(ficheroList.size() - 1);
        assertThat(testFichero.getPath()).isEqualTo(DEFAULT_PATH);
        assertThat(testFichero.getNombre_fichero()).isEqualTo(DEFAULT_NOMBRE_FICHERO);
        assertThat(testFichero.getContentType()).isEqualTo(DEFAULT_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createFicheroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ficheroRepository.findAll().size();

        // Create the Fichero with an existing ID
        fichero.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFicheroMockMvc.perform(post("/api/ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fichero)))
            .andExpect(status().isBadRequest());

        // Validate the Fichero in the database
        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFicheroes() throws Exception {
        // Initialize the database
        ficheroRepository.saveAndFlush(fichero);

        // Get all the ficheroList
        restFicheroMockMvc.perform(get("/api/ficheroes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fichero.getId().intValue())))
            .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH.toString())))
            .andExpect(jsonPath("$.[*].nombre_fichero").value(hasItem(DEFAULT_NOMBRE_FICHERO.toString())))
            .andExpect(jsonPath("$.[*].contentType").value(hasItem(DEFAULT_CONTENT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getFichero() throws Exception {
        // Initialize the database
        ficheroRepository.saveAndFlush(fichero);

        // Get the fichero
        restFicheroMockMvc.perform(get("/api/ficheroes/{id}", fichero.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fichero.getId().intValue()))
            .andExpect(jsonPath("$.path").value(DEFAULT_PATH.toString()))
            .andExpect(jsonPath("$.nombre_fichero").value(DEFAULT_NOMBRE_FICHERO.toString()))
            .andExpect(jsonPath("$.contentType").value(DEFAULT_CONTENT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFichero() throws Exception {
        // Get the fichero
        restFicheroMockMvc.perform(get("/api/ficheroes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFichero() throws Exception {
        // Initialize the database
        ficheroService.save(fichero);

        int databaseSizeBeforeUpdate = ficheroRepository.findAll().size();

        // Update the fichero
        Fichero updatedFichero = ficheroRepository.findById(fichero.getId()).get();
        // Disconnect from session so that the updates on updatedFichero are not directly saved in db
        em.detach(updatedFichero);
        updatedFichero
            .path(UPDATED_PATH)
            .nombre_fichero(UPDATED_NOMBRE_FICHERO)
            .contentType(UPDATED_CONTENT_TYPE);

        restFicheroMockMvc.perform(put("/api/ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFichero)))
            .andExpect(status().isOk());

        // Validate the Fichero in the database
        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeUpdate);
        Fichero testFichero = ficheroList.get(ficheroList.size() - 1);
        assertThat(testFichero.getPath()).isEqualTo(UPDATED_PATH);
        assertThat(testFichero.getNombre_fichero()).isEqualTo(UPDATED_NOMBRE_FICHERO);
        assertThat(testFichero.getContentType()).isEqualTo(UPDATED_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingFichero() throws Exception {
        int databaseSizeBeforeUpdate = ficheroRepository.findAll().size();

        // Create the Fichero

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFicheroMockMvc.perform(put("/api/ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fichero)))
            .andExpect(status().isBadRequest());

        // Validate the Fichero in the database
        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFichero() throws Exception {
        // Initialize the database
        ficheroService.save(fichero);

        int databaseSizeBeforeDelete = ficheroRepository.findAll().size();

        // Delete the fichero
        restFicheroMockMvc.perform(delete("/api/ficheroes/{id}", fichero.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fichero.class);
        Fichero fichero1 = new Fichero();
        fichero1.setId(1L);
        Fichero fichero2 = new Fichero();
        fichero2.setId(fichero1.getId());
        assertThat(fichero1).isEqualTo(fichero2);
        fichero2.setId(2L);
        assertThat(fichero1).isNotEqualTo(fichero2);
        fichero1.setId(null);
        assertThat(fichero1).isNotEqualTo(fichero2);
    }
}
