document.addEventListener('DOMContentLoaded', function() {
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    const ulContainer = document.getElementById('zero-container');
    const total = document.getElementById('total-count');

    function displayAllMovies() {
        let movieEntries = JSON.parse(localStorage.getItem('movies')) || [];
        
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

    function deleteAllMovies() {
        // Remove all movies from local storage
        localStorage.removeItem('movies');
        
        // Update the UI to reflect the change
        displayAllMovies();
    }

    // Add event listener to the "Delete All" button
    deleteAllBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete all movies?')) {
            deleteAllMovies();
        }
    });

    // Initial display of movies
    displayAllMovies();
});