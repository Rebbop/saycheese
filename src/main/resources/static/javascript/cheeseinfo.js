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

                            const percentages = calculateLikes(cheeseDTO.likes, cheeseDTO.dislikes);
                            const likesElement = document.createElement('p');
                            likesElement.textContent = `Likes: ${cheeseDTO.likes} (${percentages[0].toFixed(2)}%)`;
                            document.body.appendChild(likesElement);

                            const dislikesElement = document.createElement('p');
                            dislikesElement.textContent = `Dislikes: ${cheeseDTO.dislikes} (${percentages[1].toFixed(2)}%)`;
                            document.body.appendChild(dislikesElement);

                            const likeButton = document.createElement('button');
                             likeButton.textContent = 'Like';
                             document.body.appendChild(likeButton);
                             addLikeButtonEventListener(likeButton, cheeseDTO, likesElement);

                             const dislikeButton = document.createElement('button');
                             dislikeButton.textContent = 'Dislike';
                             document.body.appendChild(dislikeButton);
                             addDislikeButtonEventListener(dislikeButton, cheeseDTO, dislikesElement);

                            const webpagesElement = document.createElement('p');
                            webpagesElement.textContent = 'Webpages:';
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
function addLikeButtonEventListener(likeButton, cheeseDTO, likesElement) {
    likeButton.addEventListener('click', () => {
        fetch(`/api/cheeses/${cheeseId}/like`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                cheeseDTO.likes = data.likes;
                likesElement.textContent = `Likes: ${cheeseDTO.likes} (${calculateLikes(cheeseDTO.likes, cheeseDTO.dislikes)[0].toFixed(2)}%)`;
                location.reload();
            });
    });
}

function addDislikeButtonEventListener(dislikeButton, cheeseDTO, dislikesElement) {
    dislikeButton.addEventListener('click', () => {
        fetch(`/api/cheeses/${cheeseId}/dislike`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                cheeseDTO.dislikes = data.dislikes;
                dislikesElement.textContent = `Dislikes: ${cheeseDTO.dislikes} (${calculateLikes(cheeseDTO.likes, cheeseDTO.dislikes)[1].toFixed(2)}%)`;
                location.reload();
            });
    });
}