package com.biancaregulski.nextdestination;

import com.biancaregulski.nextdestination.model.City;
import com.biancaregulski.nextdestination.model.Destination;
import com.biancaregulski.nextdestination.model.CityRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {
    private final CityRepository repository;

    public Initializer(CityRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Boston", "Seattle", "Austin", "Savannah")
            .forEach(city -> repository.save(new City(city, "United States", 1.0, 1.0)));
        City bostonCity = repository.findByCity("Boston");
        Destination freedomDest = new Destination ("Freedom Trail", 42.3601, -71.0589);
        Destination museumDest = new Destination ("Museum of Fine Arts", 42.3394, -71.0940);
        bostonCity.getDestinations().add(freedomDest);
        bostonCity.getDestinations().add(museumDest);
        bostonCity.setDestinations(bostonCity.getDestinations());
        repository.save(bostonCity);
        repository.findAll().forEach(System.out::println);
    }
}