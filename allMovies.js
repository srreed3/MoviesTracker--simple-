document.addEventListener('DOMContentLoaded', function() {
    
    //display all movies by title only; no deleting or updating
    function displayAllMovies() {
        let movieEntries = JSON.parse(localStorage.getItem('movies')) || [];
        let ulContainer = document.getElementById('zero-container');
        let total = document.getElementById('total-count');
        
        ulContainer.innerHTML = ''; // Clear existing list
        
        movieEntries.forEach(movie => {
            movieEntries.sort((a, b) => a.title.localeCompare(b.title));
            let listItem = `<li id="individualMovie1">${movie.title.toUpperCase()}</li>`;
            ulContainer.innerHTML += listItem;
        });

        //update total count
        total.textContent = movieEntries.length;
    }

    displayAllMovies();
});