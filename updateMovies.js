// updateMovies.js

document.addEventListener('DOMContentLoaded', function() {
    let movieEntries = JSON.parse(localStorage.getItem('movies')) || [];

    function updateMovie(index, title, relDate, rating, length, file) {
        movieEntries[index].title = title;

        if (relDate) {
            movieEntries[index].relDate = relDate;
        }
        if (rating) {
            movieEntries[index].rating = rating;
        }
        if (length) {
            movieEntries[index].length = length;
        }
        if (file) {
            movieEntries[index].file = file;
        }
        
        localStorage.setItem('movies', JSON.stringify(movieEntries));
    }

    function getMovieByIndex(index) {
        return movieEntries[index];
    }

    function populateForm(movie) {
        document.getElementById('title').value = '';
        document.getElementById('relDate').value = '';
        document.getElementById('rating').value = '';
        document.getElementById('length').value = '';
    }

    function getMovieIndexFromQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('index'));
    }

    document.getElementById('formContainer3').addEventListener('submit', function(event) {
        event.preventDefault();

        let index = getMovieIndexFromQuery();
        let title = document.getElementById('title').value.trim();
        let relDate = document.getElementById('relDate').value.trim();
        let rating = document.getElementById('rating').value.trim();
        let length = document.getElementById('length').value.trim();
        let fileInput = document.getElementById('file');
        let file = fileInput.files[0];

        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let fileData = e.target.result;
                updateMovie(index, title, relDate, rating, length, fileData);
                window.location.href = 'index.html';          //redirect to index.html after update
            };
            reader.readAsDataURL(file);
        } else {
            updateMovie(index, title, relDate, rating, length, movieEntries[index].file);
            window.location.href = 'index.html';
        }
    });

    // Initialize form with existing movie details for update
    let index = getMovieIndexFromQuery();
    let movieToUpdate = getMovieByIndex(index);
    populateForm(movieToUpdate);
});