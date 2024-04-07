package be.vdab.saycheese.DTO;

import be.vdab.saycheese.entities.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;

public class CheeseDTO {
    private long id;
    private String name;
    private boolean vegetarian;
    private Country country;
    private Colour colour;
    private int likes;
    private int dislikes;
    private int version;
    @JsonManagedReference
    private List<Flavour> flavours;
    @JsonManagedReference
    private List<Animal> animals;
    @JsonManagedReference
    private List<Webpage> webpages;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public void setVegetarian(boolean vegetarian) {
        this.vegetarian = vegetarian;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Colour getColour() {
        return colour;
    }

    public void setColour(Colour colour) {
        this.colour = colour;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public List<Flavour> getFlavours() {
        return flavours;
    }

    public void setFlavours(List<Flavour> flavours) {
        this.flavours = flavours;
    }

    public List<Animal> getAnimals() {
        return animals;
    }

    public void setAnimals(List<Animal> animals) {
        this.animals = animals;
    }

    public List<Webpage> getWebpages() {
        return webpages;
    }

    public void setWebpages(List<Webpage> webpages) {
        this.webpages = webpages;
    }
}