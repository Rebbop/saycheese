function createCountryListItem(country) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = country.name;
    a.href = '../html/Cheeses.html';
    a.addEventListener('click', (event) => {
        event.preventDefault();
        sessionStorage.setItem('countryId', country.id);
        sessionStorage.setItem('countryName', country.name);
        window.location.href = a.href;
    });
    li.appendChild(a);
    return li;
}

function fetchCountries() {
    fetch('http://localhost:8080/countries')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(countries => {
            if (!Array.isArray(countries)) {
                console.error('Error: Expected an array of countries, but got:', countries);
                return;
            }
            const countriesList = document.getElementById('countries-list');
            countries.forEach(country => {
                const countryListItem = createCountryListItem(country);
                countriesList.appendChild(countryListItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

fetchCountries();