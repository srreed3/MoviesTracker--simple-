document.addEventListener('DOMContentLoaded', function() {
    
    // Display all movies by title only; no deleting or updating
    function displayAllMovies() {
        let movieEntries = JSON.parse(localStorage.getItem('movies')) || [];
        let ulContainer = document.getElementById('zero-container');
        let total = document.getElementById('total-count');
        
        ulContainer.innerHTML = ''; // Clear existing list
        
        if (movieEntries.length === 0) {
            // Display the sad face message if there are no movies
            ulContainer.innerHTML = `
                <li id="sad-message">
                    <img src="images/sad_face.png" alt="Sad face" style="max-width: 250px; max-height: 250px;">
                    <p>There's no movies here yet.</p>
                </li>`;
        } else {
            // Display the movie titles if there are movies
            movieEntries.sort((a, b) => a.title.localeCompare(b.title));
            movieEntries.forEach(movie => {
                let listItem = `<li id="individualMovie1">${movie.title.toUpperCase()}</li>`;
                ulContainer.innerHTML += listItem;
            });
        }

        // Update total count
        total.textContent = movieEntries.length;
    }

    displayAllMovies();
});