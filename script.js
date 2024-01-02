const searchForm = document.querySelector("form");
const inputBox = document.getElementById("inputBox");
const movieContainer = document.getElementById("movie-container");
const movieGenere = document.querySelectorAll(".movie-genere p");

//function to use fetch the data
const getMovieInfo = async(movie)=>{
    const key = '5c84de2e';
    const API = `http://www.omdbapi.com/?apikey=${key}&t=${movie}`;

    try{
        const res = await fetch(API);
        const data = await res.json(res);
        showMovieData(data);

        if(!res.ok){
            throw new Error("Unable to fetch Data.")
        }
    }catch(error){
        showError("NO Movie Found");
    }
   
}

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        getMovieInfo(movieName);
    }
    else{
        showError("<h1>Enter Movie Name to Get Movie Info...</h1>");
    }
})

//function to show movie dets
const showMovieData = (data) =>{
    const {Actors,Awards,Director,Genre,Plot,Poster,Rated,Type,Writer,Year,Ratings
    ,imdbVotes,BoxOffice,Title,Runtime,totalSeasons,Released}= data;
    
        movieContainer.innerHTML = `
        <div class="movieName-desc">
                
                    <h1>${Title}</h1>
                    <div class="name-desc">
                        <p>${Type}</p>
                        <p>${Year}</p>
                        <p>${Rated}</p>
                        <p>${Runtime}</p>
                    </div>
                   </div>


                    <div class="poster-desc">
                        <img src="${Poster}" alt="">
                        <div class="movie-desc">
                            <h3>IMDB Rateing: <p><i class="bi bi-star-fill"></i> ${Ratings[0].Value}</p></h3>
                            <div class="movie-genere"><p>${Genre}</p> </div>
                            <h3>Released Date: <p>${Released}</p></h3>
                            <h3>Cast: <p>${Actors}</p></h3>
                            <h3>Plot: <p>${Plot}</p></h3>
                        </div>
                    </div>
                </div>
        
        `

}

//Error function
const showError = (msg)=>{
    
    movieContainer.innerHTML= `<h2>${msg}</h2>`

}