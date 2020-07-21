package com.biancaregulski.nextdestination.model;

import lombok.Data;
import lombok.NonNull;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_group")
public class City {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull private String city;
    @NonNull private String country;
    @NonNull private Double latitude;
    @NonNull private Double longitude;

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Destination> destinations;

    public void addDestination(Destination d) {
        destinations.add(d);
    }

	public Long getId() {
		return id;
    }
    
    public Set<Destination> getDestinations() {
        return destinations;
    }
}