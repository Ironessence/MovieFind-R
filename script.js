
const main = document.getElementById('main');
main.innerHTML = "";


function getMovies(query) {


    const url = `https://api.tvmaze.com/search/shows?q=${query}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let shows = data.map(element => element.show);
            showMovies(shows);
            console.log(shows);

        })
}


function showMovies(shows) {
    main.innerHTML = "";
    shows.forEach(show => {
        let image = show.image.medium;
        if (image === null) {
            let image = "no image";
        }

        // let image = show.image.medium;
        // if (image === null) {
        // image.src = "https://images.unsplash.com/photo-1644347572455-9792032705de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
        // }
        const name = show.name;
        let rating = show.rating.average;
        if (rating === null) {
            rating = "No rating";
        }
        let summary = show.summary;
        if (summary === null) {
            summary = "Nothing to say about this shit";
        }

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${image}"
                alt="">
            <div class="movie-info">
                <h3>${name}</h3>
                <span class="green">${rating}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>${summary}
            </div>
                 
        
        
        
        `

        main.appendChild(movieEl);

    })
}

let searchTimeoutToken = 0;
window.onload = () => {
    const searchFieldElement = document.getElementById("search")
    searchFieldElement.onkeyup = (event) => {
        clearTimeout(searchTimeoutToken);
        searchTimeoutToken = setTimeout(() => {
            getMovies(searchFieldElement.value);
        }, 250);

    };
}





//image
//name
//rating
//summary