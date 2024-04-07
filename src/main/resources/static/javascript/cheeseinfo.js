const cheeseId = sessionStorage.getItem('cheeseId');

function CheeseDTO(id, name, vegetarian, country, colour, likes, dislikes, version, flavours, animals, webpages) {
        this.id = id;
        this.name = name;
        this.vegetarian = vegetarian;
        this.country = country;
        this.colour = colour;
        this.likes = likes;
        this.dislikes = dislikes;
        this.version = version;
        this.flavours = flavours;
        this.animals = animals;
        this.webpages = webpages;
}

let isFetching = false;

function fetchCheeseInfo() {
        if (!isFetching) {
                isFetching = true;
                fetch(`/api/cheeses/${cheeseId}`)
                    .then(response => response.json())
                    .then(data => {
                            const cheeseDTO = new CheeseDTO(
                                data.id,
                                data.name,
                                data.vegetarian,
                                data.country,
                                data.colour,
                                data.likes,
                                data.dislikes,
                                data.version,
                                data.flavours,
                                data.animals,
                                data.webpages
                            );

                            document.title = cheeseDTO.name;

                            const countryElement = document.createElement('p');
                            countryElement.textContent = `Country: ${cheeseDTO.country.name}`;
                            document.body.appendChild(countryElement);

                            const colourElement = document.createElement('p');
                            colourElement.textContent = `Colour: ${cheeseDTO.colour.name}`;
                            document.body.appendChild(colourElement);

                            const vegetarianElement = document.createElement('p');
                            vegetarianElement.textContent = `Vegetarian: ${cheeseDTO.vegetarian ? 'Yes' : 'No'}`;
                            document.body.appendChild(vegetarianElement);

                            const flavoursElement = document.createElement('p');
                            if (cheeseDTO.flavours && cheeseDTO.flavours.length > 0) {
                                    flavoursElement.textContent = `Flavours: ${cheeseDTO.flavours.map(flavour => flavour.name).join(', ')}`;
                            } else {
                                    flavoursElement.textContent = 'Flavours: None';
                            }
                            document.body.appendChild(flavoursElement);

                            const animalsElement = document.createElement('p');
                            animalsElement.textContent = `Animals: ${cheeseDTO.animals.map(animal => animal.name).join(', ')}`;
                            document.body.appendChild(animalsElement);

                            const likesElement = document.createElement('p');
                            likesElement.textContent = `Likes: ${cheeseDTO.likes}`;
                            document.body.appendChild(likesElement);

                            const dislikesElement = document.createElement('p');
                            dislikesElement.textContent = `Dislikes: ${cheeseDTO.dislikes}`;
                            document.body.appendChild(dislikesElement);

                            cheeseDTO.webpages.forEach(webpage => {
                                    const webpageElement = document.createElement('a');
                                    webpageElement.href = webpage.url;
                                    webpageElement.textContent = webpage.url;
                                    document.body.appendChild(webpageElement);
                            });
                    })
                    .catch(error => console.error('Error:', error))
                    .finally(() => {
                            isFetching = false;
                    });
        }
}

fetchCheeseInfo();