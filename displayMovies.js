document.addEventListener('DOMContentLoaded', function() {
    let movieEntries = JSON.parse(localStorage.getItem('movies')) || [];

    function updatePages() {
        clearPages();
        movieEntries.sort((a, b) => a.title.localeCompare(b.title));
        let containerContent = {
            'first-container': false,
            'second-container': false,
            'third-container': false,
            'fourth-container': false,
            'fifth-container': false,
            'sixth-container': false
        };

        movieEntries.forEach((movie, index) => {
            let firstLetter = movie.title[0].toUpperCase();

            // Add delete button with onclick event
            let listItem = `<li id="individualMovie"><button id="delete-btn" onclick="deleteMovie(${index})">Delete</button>`;
            listItem += `<br><strong>${movie.title.toUpperCase()}</strong>`;

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
                listItem += `<br><div id="img-container"><img src="${movie.file}" alt="${movie.title} picture" style="max-width: 200px; max-height: 200px;"></div>`;
            }

            // Add update link with href to update.html passing movie index
            listItem += `<a href="update.html?index=${index}" id="update-btn">Update</a>`;
            listItem += `</li>`;

            let container = getContainerElement(firstLetter);
            if (container) {
                container.innerHTML += listItem;
                containerContent[container.id] = true; // Mark container as having content
            }
        });

        // Check each container and add the message if empty
        for (let containerId in containerContent) {
            if (!containerContent[containerId]) {
                let container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = `<li id="sad-message"><img src="images/sad_face.png" alt="Sad face" style="max-width: 200px; max-height: 200px;"><p>There's no movies here yet.</p></li>`;
                }
            }
        }
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