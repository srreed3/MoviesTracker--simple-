document.addEventListener('DOMContentLoaded', function() {
    let movieEntries = JSON.parse(localStorage.getItem('movies')) || [];

    function updateMovie(index, title, relDate, rating, length, lastWatchedDate, file) {
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
        if (lastWatchedDate) {
            movieEntries[index].lastWatchedDate = lastWatchedDate;
        }
        if (file) {
            movieEntries[index].file = file;
        }
        
        localStorage.setItem('movies', JSON.stringify(movieEntries));
        showPopup('Movie updated successfully');
    }

    function showPopup(message) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.textContent = message;
        document.body.appendChild(popup);

        // Trigger reflow to apply transition
        window.getComputedStyle(popup).opacity;
        popup.classList.add('show');

        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.remove();
            }, 500); // Remove element after fade-out transition
        }, 2000); // Show the message for 3 seconds
    }

    function getMovieByIndex(index) {
        return movieEntries[index];
    }

    function populateForm(movie) {
        document.getElementById('title').value = movie.title || '';
        document.getElementById('relDate').value = movie.relDate || '';
        document.getElementById('rating').value = movie.rating || '';
        let [hrs, mins] = movie.length = ['', ''];
        document.getElementById('hrs').value = hrs || '';
        document.getElementById('mins').value = mins || '';
        document.getElementById('lastwatchedDate').value = movie.lastWatchedDate || '';
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
        let hrs = document.getElementById('hrs').value.trim();
        let mins = document.getElementById('mins').value.trim();
        let length = hrs && mins ? `${hrs} hr(s), ${mins} min(s)` : '';
        let lastWatchedDate = document.getElementById('lastwatchedDate').value.trim();
        let fileInput = document.getElementById('file');
        let file = fileInput.files[0];

        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let fileData = e.target.result;
                updateMovie(index, title, relDate, rating, length, lastWatchedDate, fileData);
            };
            reader.readAsDataURL(file);
        } else {
            updateMovie(index, title, relDate, rating, length, lastWatchedDate, '');
        }
    });

    let index = getMovieIndexFromQuery();
    if (index !== null && index >= 0) {
        let movie = getMovieByIndex(index);
        populateForm(movie);
    }
});