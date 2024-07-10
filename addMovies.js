document.addEventListener('DOMContentLoaded', function() {
    let movieEntries = JSON.parse(localStorage.getItem('movies')) || [];

    function addMovie(title, relDate, rating, length, file) {
        movieEntries.push({ title, relDate, rating, length, file });
        localStorage.setItem('movies', JSON.stringify(movieEntries));
        document.getElementById('formContainer1').reset();
    }

    document.getElementById('formContainer1').addEventListener('submit', function(event) {
        event.preventDefault();
        let title = document.getElementById('title').value;
        let relDate = document.getElementById('relDate').value;
        let rating = document.getElementById('rating').value;
        let length = document.getElementById('length').value;
        let fileInput = document.getElementById('file');
        let file = fileInput.files[0]
        
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let fileData = e.target.result;
                addMovie(title, relDate, rating, length, fileData);
            };
            reader.readAsDataURL(file);
        } else {
            addMovie(title, relDate, rating, length, '');
        }
    });
});