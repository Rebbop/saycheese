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
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `/country/${country.id}`;
            a.textContent = country.name;
            li.appendChild(a);
            countriesList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));