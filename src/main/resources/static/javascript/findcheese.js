function createSearchResultRow(item) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.country.name}</td>
        <td>${item.colour.name}</td>
    `;
    const linkCell = document.createElement('td');
    const a = document.createElement('a');
    a.textContent = 'View Details';
    a.href = '../html/cheeseinfo.html';
    a.addEventListener('click', (event) => {
        event.preventDefault();
        sessionStorage.setItem('cheeseId', item.id);
        window.location.href = a.href;
    });
    linkCell.appendChild(a);
    row.appendChild(linkCell);
    return row;
}

function fetchSearchResults(query) {
    const resultsTableBody = document.getElementById('resultsTable').querySelector('tbody');
    resultsTableBody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>'; // Loading state
    fetch('/api/cheeses/search?query=' + encodeURIComponent(query))
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data = data.sort((a, b) => a.name.localeCompare(b.name));
            resultsTableBody.innerHTML = '';
            data.forEach(item => {
                const searchResultRow = createSearchResultRow(item);
                resultsTableBody.appendChild(searchResultRow);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            resultsTableBody.innerHTML = '<tr><td colspan="4">An error occurred while fetching the data.</td></tr>';
        });
}

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    fetchSearchResults(searchInput);
});