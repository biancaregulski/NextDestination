package com.biancaregulski.nextdestination.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class Destination {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @NonNull private String name;
    @NonNull private Double latitude;
    @NonNull private Double longitude;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private City city;
}