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

function createElementWithText(elementType, text) {
    const element = document.createElement(elementType);
    element.textContent = text;
    return element;
}

function addButtonEventListener(button, cheeseDTO, endpoint, elementToUpdate) {
    button.addEventListener('click', () => {
        fetch(`/api/cheeses/${cheeseId}/${endpoint}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                cheeseDTO.likes = data.likes;
                cheeseDTO.dislikes = data.dislikes;
                const percentages = calculateLikes(cheeseDTO.likes, cheeseDTO.dislikes);
                elementToUpdate.textContent = `${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}: ${cheeseDTO[endpoint]} (${percentages[endpoint === 'like' ? 0 : 1].toFixed(2)}%)`;
                location.reload();
            });
    });
}

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

                const countryElement = createElementWithText('p', `Country: ${cheeseDTO.country.name}`);
                document.body.appendChild(countryElement);

                const colourElement = createElementWithText('p', `Colour: ${cheeseDTO.colour.name}`);
                document.body.appendChild(colourElement);

                const vegetarianElement = createElementWithText('p', `Vegetarian: ${cheeseDTO.vegetarian ? 'Yes' : 'No'}`);
                document.body.appendChild(vegetarianElement);

                const flavoursElement = createElementWithText('p', `Flavours: ${cheeseDTO.flavours && cheeseDTO.flavours.length > 0 ? cheeseDTO.flavours.map(flavour => flavour.name).join(', ') : 'None'}`);
                document.body.appendChild(flavoursElement);

                const animalsElement = createElementWithText('p', `Animals: ${cheeseDTO.animals.map(animal => animal.name).join(', ')}`);
                document.body.appendChild(animalsElement);

                const percentages = calculateLikes(cheeseDTO.likes, cheeseDTO.dislikes);
                const likesElement = createElementWithText('p', `Likes: ${cheeseDTO.likes} (${percentages[0].toFixed(2)}%)`);
                document.body.appendChild(likesElement);

                const dislikesElement = createElementWithText('p', `Dislikes: ${cheeseDTO.dislikes} (${percentages[1].toFixed(2)}%)`);
                document.body.appendChild(dislikesElement);

                const likeButton = createElementWithText('button', 'Like');
                document.body.appendChild(likeButton);
                addButtonEventListener(likeButton, cheeseDTO, 'like', likesElement);

                const dislikeButton = createElementWithText('button', 'Dislike');
                document.body.appendChild(dislikeButton);
                addButtonEventListener(dislikeButton, cheeseDTO, 'dislike', dislikesElement);

                const webpagesElement = createElementWithText('p', 'Webpages:');
                document.body.appendChild(webpagesElement);
                cheeseDTO.webpages.forEach(webpage => {
                    const webpageElement = document.createElement('a');
                    webpageElement.href = webpage.url;
                    webpageElement.textContent = webpage.url;

                    const webpageContainer = document.createElement('div');
                    webpageContainer.appendChild(webpageElement);

                    document.body.appendChild(webpageContainer);
                });
            })
            .catch(error => console.error('Error:', error))
            .finally(() => {
                isFetching = false;
            });
    }
}

fetchCheeseInfo();

function calculateLikes(likes,dislikes){
    let total = likes + dislikes;
    if (total === 0) {
        return [0, 0];
    }
    let likesPercent = (likes / total) * 100;
    let dislikesPercent = (dislikes / total) * 100;
    return [likesPercent, dislikesPercent];
}