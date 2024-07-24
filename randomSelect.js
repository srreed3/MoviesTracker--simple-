document.addEventListener('DOMContentLoaded', function() {
    
    // Function to get a random movie
    function getRandomMovie() {
        let movieEntries = JSON.parse(localStorage.getItem('movies')) || [];
        if (movieEntries.length === 0) {
            return "No movies available.";
        }
        let randomIndex = Math.floor(Math.random() * movieEntries.length);
        return movieEntries[randomIndex];
    }

    // Function to format movie details for display
    function formatMovieDetails(movie) {
        let details = `<strong>Title:</strong> ${movie.title}<br>`;

        if (movie.relDate) {
            details += `<strong>Release Date:</strong> ${movie.relDate}<br>`;
        }
        if (movie.rating) {
            details += `<strong>Rating:</strong> ${movie.rating}<br>`;
        }
        if (movie.length) {
            details += `<strong>Length:</strong> ${movie.length}<br>`;
        }
        if (movie.description) {
            details += `<strong>Description:</strong> ${movie.description}<br>`;
        }
        if (movie.lastWatchedDate) {
            let formattedDate = new Date(movie.lastWatchedDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
            details += `<strong>Last Watched:</strong> ${formattedDate}<br>`;
        }

        return details;
    }

    // Add event listener to the random select button
    document.getElementById('randomSelectBtn').addEventListener('click', function() {
        let randomMovie = getRandomMovie();
        let displayText = randomMovie === "No movies available." ? randomMovie : formatMovieDetails(randomMovie);
        
        // Show the randomMovieDisplay element
        let displayElement = document.getElementById('randomMovieDisplay');
        displayElement.innerHTML = displayText; // Use innerHTML to support HTML formatting
        displayElement.style.display = 'block'; // Make it visible
    });
});