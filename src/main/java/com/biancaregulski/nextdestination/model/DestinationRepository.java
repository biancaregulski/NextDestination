package com.biancaregulski.nextdestination.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
    Destination findByName(String name);
}