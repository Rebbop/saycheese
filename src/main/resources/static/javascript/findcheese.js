document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    const resultsTableBody = document.getElementById('resultsTable').querySelector('tbody');
    resultsTableBody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>'; // Loading state
    try {
        const response = await fetch('/api/cheeses/search?query=' + encodeURIComponent(searchInput));
        let data = await response.json();
        data = data.sort((a, b) => a.name.localeCompare(b.name));
        resultsTableBody.innerHTML = '';
        data.forEach(item => {
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
            resultsTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        resultsTableBody.innerHTML = '<tr><td colspan="4">An error occurred while fetching the data.</td></tr>';
    }
});