const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// function to fetch movie info from OMDB API
const getMovieInfo = async (movie) => {
    try{
        const myApiKey = "3a0cf17c";
        const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

        const response = await fetch(url);
        
        if(!response.ok){
            throw new Error("Unable to fetch movie data.")
        }

        const data = await response.json();

        showMovieData(data);
    }
    catch(error){
        showErrorMessage("No Movie Found.");
    }
    
}

// function to show movie info in the page
const showMovieData = (data) => {

    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');

    // Extracting required details from API response
    const{Title, imdbRating, Genre, Released, Writer, Actors, Plot, Poster} = data;


    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;${imdbRating}</strong></p>`;

    const movieGenereElement = document.createElement('div');
    movieGenereElement.classList.add('movie-genre');
    
    Genre.split(",").forEach(element => {
        const p = document.createElement("p");
        p.innerText = element;
        movieGenereElement.appendChild(p);
    });

    // appending / adding movie-genre to movie-element
    movieElement.appendChild(movieGenereElement);

    // Adding release date, writer, cast, and plot
    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                              <p><strong>Writer: </strong>${Writer}</p>
                              <p><strong>Cast: </strong>${Actors}</p>
                              <p><strong>Plot: </strong>${Plot}</p>`;

                              
    // creating a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src = "${Poster}"></img>`;


    movieContainer.appendChild(moviePosterElement); //appending poster to container
    movieContainer.appendChild(movieElement); //appending movie info/element to container
}

// Function to display error msg
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}

// adding event listener to search bar
searchForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        getMovieInfo(movieName);
    }
    else{
        showErrorMessage("Enter movie name to get movie information");   
    };
})