const countryId = sessionStorage.getItem('countryId');
const countryName = sessionStorage.getItem('countryName');
console.log('countryId:', countryId);
console.log('countryName:', countryName);
document.title = countryName;

fetch(`http://localhost:8080/countries/${countryId}/cheeses`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(cheeses => {
        if (!Array.isArray(cheeses)) {
            console.error('Error: Expected an array of cheeses, but got:', cheeses);
            return;
        }
        const cheesesList = document.getElementById('cheeses-list');
        cheeses.forEach(cheese => {
            const li = document.createElement('li');
            li.textContent = cheese.name;
            cheesesList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));