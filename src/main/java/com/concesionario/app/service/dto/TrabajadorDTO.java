package com.concesionario.app.service.dto;

import com.concesionario.app.domain.Trabajador;

public class TrabajadorDTO {

    private Long id;


    private String dni;


    private String nombre;

    private String apellido;


    private String cargo;


    private Integer telefono;



    private Integer ventas_totales;

    public TrabajadorDTO() {

    }

    public TrabajadorDTO(Trabajador trabajador) {

        this.id = trabajador.getId();
        this.dni = trabajador.getDni();
        this.apellido = trabajador.getApellido();
        this.cargo = trabajador.getCargo();
        this.nombre = trabajador.getNombre();
        this.telefono = trabajador.getTelefono();
        this.ventas_totales = trabajador.getVentas_totales();

    }


    public Long getId() {
        return id;
    }



    public void setId(Long id) {
        this.id = id;
    }



    public String getDni() {
        return dni;
    }



    public void setDni(String dni) {
        this.dni = dni;
    }



    public String getNombre() {
        return nombre;
    }



    public void setNombre(String nombre) {
        this.nombre = nombre;
    }



    public String getApellido() {
        return apellido;
    }



    public void setApellido(String apellido) {
        this.apellido = apellido;
    }



    public String getCargo() {
        return cargo;
    }



    public void setCargo(String cargo) {
        this.cargo = cargo;
    }



    public Integer getTelefono() {
        return telefono;
    }



    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }



    public Integer getVentas_totales() {
        return ventas_totales;
    }



    public void setVentas_totales(Integer ventas_totales) {
        this.ventas_totales = ventas_totales;
    }






}
