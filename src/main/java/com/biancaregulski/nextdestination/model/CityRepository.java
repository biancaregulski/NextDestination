package com.biancaregulski.nextdestination.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
    City findByCity(String city);
}