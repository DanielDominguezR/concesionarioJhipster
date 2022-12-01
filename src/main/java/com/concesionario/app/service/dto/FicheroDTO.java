package com.concesionario.app.service.dto;

import com.concesionario.app.domain.Fichero;

public class FicheroDTO {

    private Long id;
    private String path;
    private String nombre_fichero;
    private String contentType;

public FicheroDTO(){

    }

public FicheroDTO (Fichero fichero){
    this.id = fichero.getId();
    this.path = fichero.getPath();
    this.nombre_fichero = fichero.getNombre_fichero();
    this.contentType = fichero.getContentType();
}



    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getPath() {
        return path;
    }
    public void setPath(String path) {
        this.path = path;
    }
    public String getNombre_fichero() {
        return nombre_fichero;
    }
    public void setNombre_fichero(String nombre_fichero) {
        this.nombre_fichero = nombre_fichero;
    }
    public String getContentType() {
        return contentType;
    }
    public void setContentType(String contentType) {
        this.contentType = contentType;
    }






}
