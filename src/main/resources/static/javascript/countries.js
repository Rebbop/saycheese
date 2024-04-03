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
            a.href = `/html/Cheeses.html`;
            a.textContent = country.name;
            a.addEventListener('click', function(event) {
                event.preventDefault();
                console.log('Setting countryId and countryName in sessionStorage:', country.id, country.name);
                sessionStorage.setItem('countryName', country.name);
                sessionStorage.setItem('countryId', country.id);
                console.log('Navigating to:', this.href);
                window.location.href = this.href;
            });
            li.appendChild(a);
            countriesList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));