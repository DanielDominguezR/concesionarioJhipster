package com.concesionario.app.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Fichero.
 */
@Entity
@Table(name = "fichero")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fichero implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "path")
    private String path;

    @Column(name = "nombre_fichero")
    private String nombre_fichero;

    @Column(name = "content_type")
    private String contentType;

    @ManyToOne
    private GestorFichero ficheros;




    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public Fichero path(String path) {
        this.path = path;
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getNombre_fichero() {
        return nombre_fichero;
    }

    public Fichero nombre_fichero(String nombre_fichero) {
        this.nombre_fichero = nombre_fichero;
        return this;
    }

    public void setNombre_fichero(String nombre_fichero) {
        this.nombre_fichero = nombre_fichero;
    }

    public String getContentType() {
        return contentType;
    }

    public Fichero contentType(String contentType) {
        this.contentType = contentType;
        return this;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public GestorFichero getFicheros() {
        return ficheros;
    }

    public Fichero ficheros(GestorFichero gestorFichero) {
        this.ficheros = gestorFichero;
        return this;
    }

    public void setFicheros(GestorFichero gestorFichero) {
        this.ficheros = gestorFichero;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fichero)) {
            return false;
        }
        return id != null && id.equals(((Fichero) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Fichero{" +
            "id=" + getId() +
            ", path='" + getPath() + "'" +
            ", nombre_fichero='" + getNombre_fichero() + "'" +
            ", contentType='" + getContentType() + "'" +
            "}";
    }



}
