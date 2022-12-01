package com.concesionario.app.web.rest;

import com.concesionario.app.ConcesionarioApp;
import com.concesionario.app.domain.GestorFichero;
import com.concesionario.app.repository.GestorFicheroRepository;
import com.concesionario.app.service.GestorFicheroService;
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
 * Integration tests for the {@Link GestorFicheroResource} REST controller.
 */
@SpringBootTest(classes = ConcesionarioApp.class)
public class GestorFicheroResourceIT {

    private static final String DEFAULT_FOLDER = "AAAAAAAAAA";
    private static final String UPDATED_FOLDER = "BBBBBBBBBB";

    @Autowired
    private GestorFicheroRepository gestorFicheroRepository;

    @Autowired
    private GestorFicheroService gestorFicheroService;

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

    private MockMvc restGestorFicheroMockMvc;

    private GestorFichero gestorFichero;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GestorFicheroResource gestorFicheroResource = new GestorFicheroResource(gestorFicheroService);
        this.restGestorFicheroMockMvc = MockMvcBuilders.standaloneSetup(gestorFicheroResource)
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
    public static GestorFichero createEntity(EntityManager em) {
        GestorFichero gestorFichero = new GestorFichero()
            .folder(DEFAULT_FOLDER);
        return gestorFichero;
    }

    @BeforeEach
    public void initTest() {
        gestorFichero = createEntity(em);
    }

    @Test
    @Transactional
    public void createGestorFichero() throws Exception {
        int databaseSizeBeforeCreate = gestorFicheroRepository.findAll().size();

        // Create the GestorFichero
        restGestorFicheroMockMvc.perform(post("/api/gestor-ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gestorFichero)))
            .andExpect(status().isCreated());

        // Validate the GestorFichero in the database
        List<GestorFichero> gestorFicheroList = gestorFicheroRepository.findAll();
        assertThat(gestorFicheroList).hasSize(databaseSizeBeforeCreate + 1);
        GestorFichero testGestorFichero = gestorFicheroList.get(gestorFicheroList.size() - 1);
        assertThat(testGestorFichero.getFolder()).isEqualTo(DEFAULT_FOLDER);
    }

    @Test
    @Transactional
    public void createGestorFicheroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gestorFicheroRepository.findAll().size();

        // Create the GestorFichero with an existing ID
        gestorFichero.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGestorFicheroMockMvc.perform(post("/api/gestor-ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gestorFichero)))
            .andExpect(status().isBadRequest());

        // Validate the GestorFichero in the database
        List<GestorFichero> gestorFicheroList = gestorFicheroRepository.findAll();
        assertThat(gestorFicheroList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGestorFicheroes() throws Exception {
        // Initialize the database
        gestorFicheroRepository.saveAndFlush(gestorFichero);

        // Get all the gestorFicheroList
        restGestorFicheroMockMvc.perform(get("/api/gestor-ficheroes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gestorFichero.getId().intValue())))
            .andExpect(jsonPath("$.[*].folder").value(hasItem(DEFAULT_FOLDER.toString())));
    }
    
    @Test
    @Transactional
    public void getGestorFichero() throws Exception {
        // Initialize the database
        gestorFicheroRepository.saveAndFlush(gestorFichero);

        // Get the gestorFichero
        restGestorFicheroMockMvc.perform(get("/api/gestor-ficheroes/{id}", gestorFichero.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gestorFichero.getId().intValue()))
            .andExpect(jsonPath("$.folder").value(DEFAULT_FOLDER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGestorFichero() throws Exception {
        // Get the gestorFichero
        restGestorFicheroMockMvc.perform(get("/api/gestor-ficheroes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGestorFichero() throws Exception {
        // Initialize the database
        gestorFicheroService.save(gestorFichero);

        int databaseSizeBeforeUpdate = gestorFicheroRepository.findAll().size();

        // Update the gestorFichero
        GestorFichero updatedGestorFichero = gestorFicheroRepository.findById(gestorFichero.getId()).get();
        // Disconnect from session so that the updates on updatedGestorFichero are not directly saved in db
        em.detach(updatedGestorFichero);
        updatedGestorFichero
            .folder(UPDATED_FOLDER);

        restGestorFicheroMockMvc.perform(put("/api/gestor-ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGestorFichero)))
            .andExpect(status().isOk());

        // Validate the GestorFichero in the database
        List<GestorFichero> gestorFicheroList = gestorFicheroRepository.findAll();
        assertThat(gestorFicheroList).hasSize(databaseSizeBeforeUpdate);
        GestorFichero testGestorFichero = gestorFicheroList.get(gestorFicheroList.size() - 1);
        assertThat(testGestorFichero.getFolder()).isEqualTo(UPDATED_FOLDER);
    }

    @Test
    @Transactional
    public void updateNonExistingGestorFichero() throws Exception {
        int databaseSizeBeforeUpdate = gestorFicheroRepository.findAll().size();

        // Create the GestorFichero

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGestorFicheroMockMvc.perform(put("/api/gestor-ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gestorFichero)))
            .andExpect(status().isBadRequest());

        // Validate the GestorFichero in the database
        List<GestorFichero> gestorFicheroList = gestorFicheroRepository.findAll();
        assertThat(gestorFicheroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGestorFichero() throws Exception {
        // Initialize the database
        gestorFicheroService.save(gestorFichero);

        int databaseSizeBeforeDelete = gestorFicheroRepository.findAll().size();

        // Delete the gestorFichero
        restGestorFicheroMockMvc.perform(delete("/api/gestor-ficheroes/{id}", gestorFichero.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<GestorFichero> gestorFicheroList = gestorFicheroRepository.findAll();
        assertThat(gestorFicheroList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GestorFichero.class);
        GestorFichero gestorFichero1 = new GestorFichero();
        gestorFichero1.setId(1L);
        GestorFichero gestorFichero2 = new GestorFichero();
        gestorFichero2.setId(gestorFichero1.getId());
        assertThat(gestorFichero1).isEqualTo(gestorFichero2);
        gestorFichero2.setId(2L);
        assertThat(gestorFichero1).isNotEqualTo(gestorFichero2);
        gestorFichero1.setId(null);
        assertThat(gestorFichero1).isNotEqualTo(gestorFichero2);
    }
}
