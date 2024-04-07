const countryId = sessionStorage.getItem('countryId');
const countryName = sessionStorage.getItem('countryName');
console.log('countryId:', countryId);
console.log('countryName:', countryName);
document.title = countryName;

function createCheeseListItem(cheese) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = cheese.name;
    a.href = '../html/cheeseinfo.html';
    a.addEventListener('click', (event) => {
        event.preventDefault();
        sessionStorage.setItem('cheeseId', cheese.id);
        window.location.href = a.href;
    });
    li.appendChild(a);
    return li;
}

function fetchCheeses() {
    fetch(`http://localhost:8080/api/cheeses/countries/${countryId}`)
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
                const cheeseListItem = createCheeseListItem(cheese);
                cheesesList.appendChild(cheeseListItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

fetchCheeses();