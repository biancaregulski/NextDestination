package com.biancaregulski.nextdestination.web;

import com.biancaregulski.nextdestination.model.City;
import com.biancaregulski.nextdestination.model.CityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class CityController {
    private final Logger log = LoggerFactory.getLogger(CityController.class);

    @Autowired
    private CityRepository cityRepo;

    public CityController(CityRepository cityRepo) {
        this.cityRepo = cityRepo;
    }

    @GetMapping("/cities")
    Collection<City> cities() {
        return cityRepo.findAll();
    }

    @GetMapping("/cities/{id}")
    ResponseEntity<?> getCities(@PathVariable Long id) {
        Optional<City> city = cityRepo.findById(id);
        return city.map(response -> ResponseEntity.ok().body(response))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/city")
    ResponseEntity<City> createCity(@Valid @RequestBody City city) throws URISyntaxException {
        log.info("Request to create city: {}", city);
        City result = cityRepo.save(city);
        //cityRepo.flush();
        return ResponseEntity.created(new URI("/api/city/" + result.getId())).body(result);
    }

    @PutMapping("/city/{id}")
    ResponseEntity<City> updateCity(@Valid @RequestBody City city) {
        log.info("Request to update city: {}", city);
        City result = cityRepo.save(city);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/city/{id}")
    public ResponseEntity<?> deleteCity(@PathVariable Long id) {
        log.info("Request to delete city: {}", id);
        cityRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}