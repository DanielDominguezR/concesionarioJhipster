package com.concesionario.app.service.impl;

import com.concesionario.app.service.CompraVentaService;
import com.concesionario.app.service.VehiculoService;
import com.concesionario.app.web.rest.VehiculoResource;

import antlr.collections.List;

import com.concesionario.app.domain.CompraVenta;
import com.concesionario.app.domain.Vehiculo;
import com.concesionario.app.repository.CompraVentaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional
public class CompraVentaServiceImpl implements CompraVentaService {

    private final Logger log = LoggerFactory.getLogger(CompraVentaServiceImpl.class);

    private final CompraVentaRepository compraVentaRepository;

    private final VehiculoService vehiculoService;

    public CompraVentaServiceImpl(CompraVentaRepository compraVentaRepository, VehiculoService vehiculoService) {
        this.compraVentaRepository = compraVentaRepository;
        this.vehiculoService = vehiculoService;
    }

    /**
     * Save a compraVenta.
     *
     * @param compraVenta the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CompraVenta save(CompraVenta compraVenta) {
        log.debug("Request to save CompraVenta : {}", compraVenta);
        Vehiculo vehiculo = compraVenta.getVehiculo();
        compraVenta.setPrecioTotal((double) vehiculo.getPrecio() * 1.21 );




        return compraVentaRepository.save(compraVenta);
    }
    /**
     * Get all the compraVentas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CompraVenta> findAll(Pageable pageable) {
        log.debug("Request to get all CompraVentas");
        return compraVentaRepository.findAll(pageable);
    }


    /**
     * Get one compraVenta by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CompraVenta> findOne(Long id) {
        log.debug("Request to get CompraVenta : {}", id);
        return compraVentaRepository.findById(id);
    }

    /**
     * Delete the compraVenta by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CompraVenta : {}", id);
        compraVentaRepository.deleteById(id);
    }

    @Override
    public Page<CompraVenta> getventasTotales(Pageable pageable) {
        // TODO Auto-generated method stub
        return null;
    }

    // @Override
    // public List<VentasTotales> getventasTotales() {
    //     log.debug("Request to get all CompraVentas");
    //     return compraVentaRepository.getventasTotales(null)();
    // }
}
