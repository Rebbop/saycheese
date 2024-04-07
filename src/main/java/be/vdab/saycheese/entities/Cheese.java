package be.vdab.saycheese.entities;
import be.vdab.saycheese.DTO.CheeseDTO;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "cheese")
public class Cheese {
    @Id private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "vegetarian")
    private boolean vegetarian;

    @ManyToOne
    @JoinColumn(name = "countryId")
    private Country country;

    @ManyToOne
    @JoinColumn(name = "colourId")
    private Colour colour;

    @OneToMany(mappedBy = "cheese")
    private List<Webpage> webpages;

    @Column(name = "likes")
    private int likes;

    @Column(name = "dislikes")
    private int dislikes;

    @Column(name = "version")
    private int version;

    @ManyToMany
    @JoinTable(
            name = "cheeseflavours",
            joinColumns = @JoinColumn(name = "cheeseId"),
            inverseJoinColumns = @JoinColumn(name = "flavourId")
    )
    private List<Flavour> flavours;

    @ManyToMany
    @JoinTable(
            name = "cheeseanimals",
            joinColumns = @JoinColumn(name = "cheeseId"),
            inverseJoinColumns = @JoinColumn(name = "animalId")
    )
    private List<Animal> animals;

    public CheeseDTO mapToDTO() {
        CheeseDTO dto = new CheeseDTO();
        dto.setId(this.id);
        dto.setName(this.name);
        dto.setVegetarian(this.vegetarian);
        dto.setCountry(this.country);
        dto.setColour(this.colour);
        dto.setLikes(this.likes);
        dto.setDislikes(this.dislikes);
        dto.setVersion(this.version);
        dto.setFlavours(this.flavours);
        dto.setAnimals(this.animals);
        dto.setWebpages(this.webpages);
        return dto;
    }

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

    public void setWebpages(Webpage webpage) {
        this.webpages = (List<Webpage>) webpage;
    }

    public void like() {
        this.likes++;
    }
    public void dislike() {
        this.dislikes++;
    }
}

