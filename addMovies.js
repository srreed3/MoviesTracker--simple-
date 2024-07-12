document.addEventListener('DOMContentLoaded', function() {
    let movieEntries = JSON.parse(localStorage.getItem('movies')) || [];

    function addMovie(title, relDate, rating, length, lastWatchedDate, file) {
        movieEntries.push({ title, relDate, rating, length, lastWatchedDate, file });
        localStorage.setItem('movies', JSON.stringify(movieEntries));
        document.getElementById('formContainer1').reset();
        showPopup('Movie added successfully');
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

    document.getElementById('formContainer1').addEventListener('submit', function(event) {
        event.preventDefault();
        let title = document.getElementById('title').value;
        let relDate = document.getElementById('relDate').value;
        let rating = document.getElementById('rating').value;
        let hrs = document.getElementById('hrs').value;
        let mins = document.getElementById('mins').value;
        let length = `${hrs ? parseInt(hrs) : 0} hr(s), ${mins ? parseInt(mins) : 0} min(s)`;
        let lastWatchedDate = document.getElementById('lastwatchedDate').value;
        let fileInput = document.getElementById('file');
        let file = fileInput.files[0];
        
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let fileData = e.target.result;
                addMovie(title, relDate, rating, length, lastWatchedDate, fileData);
            };
            reader.readAsDataURL(file);
        } else {
            addMovie(title, relDate, rating, length, lastWatchedDate, '');
        }
    });
});