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

    // Add event listener to the random select button
    document.getElementById('randomSelectBtn').addEventListener('click', function() {
        let randomMovie = getRandomMovie();
        let displayText = randomMovie === "No movies available." ? randomMovie : `${randomMovie.title}`;
        
        // Show the randomMovieDisplay element
        let displayElement = document.getElementById('randomMovieDisplay');
        displayElement.textContent = displayText;
        displayElement.style.display = 'block'; // Make it visible
    });
});