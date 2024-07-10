document.addEventListener('DOMContentLoaded', function() {
    let movieEntries = JSON.parse(localStorage.getItem('movies')) || [];

    function updatePages() {
        clearPages();
        movieEntries.sort((a, b) => a.title.localeCompare(b.title));
        movieEntries.forEach((movie, index) => {
            let firstLetter = movie.title[0].toUpperCase();
            let listItem = `<li id="individualMovie"><strong>${movie.title}</strong>`;

            if (movie.relDate) {
                listItem += `<br>Release Date: ${movie.relDate}`;
            }
            if (movie.rating) {
                listItem += `<br>Rating: ${movie.rating}`;
            }
            if (movie.length) {
                listItem += `<br>Length: ${movie.length}`;
            }
            if (movie.file) {
                listItem += `<br><img src="${movie.file}" alt="${movie.title} picture" style="max-width: 200px; max-height: 200px;">`;
            }

            // Add delete button with onclick event
            listItem += `<br><button onclick="deleteMovie(${index})">Delete</button>`;
            // Add update link with href to update.html passing movie index
            listItem += `<br><a href="update.html?index=${index}">Update</a>`;
            listItem += `</li>`;

            let container = getContainerElement(firstLetter);
            if (container) container.innerHTML += listItem;
        });
    }

    function clearPages() {
        const containers = ['first-container', 'second-container', 'third-container', 'fourth-container', 'fifth-container', 'sixth-container'];
        containers.forEach(id => {
            const container = document.getElementById(id);
            if (container) container.innerHTML = '';
        });
    }

    // Function to delete a movie
    window.deleteMovie = function(index) {
        movieEntries.splice(index, 1);
        localStorage.setItem('movies', JSON.stringify(movieEntries));
        updatePages();
    }

    // Function to retrieve container based on first letter of title
    function getContainerElement(firstLetter) {
        let containerId = '';
        if (firstLetter >= 'A' && firstLetter <= 'E') {
            containerId = 'first-container';
        } else if (firstLetter >= 'F' && firstLetter <= 'J') {
            containerId = 'second-container';
        } else if (firstLetter >= 'K' && firstLetter <= 'O') {
            containerId = 'third-container';
        } else if (firstLetter >= 'P' && firstLetter <= 'T') {
            containerId = 'fourth-container';
        } else if (firstLetter >= 'U' && firstLetter <= 'Z') {
            containerId = 'fifth-container';
        } else {
            containerId = 'sixth-container';
        }
        return document.getElementById(containerId);
    }

    updatePages();
});