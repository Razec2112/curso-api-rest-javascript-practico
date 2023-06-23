const callback = (entries) => {
  entries.forEach((element) => {
    if (element.isIntersecting) {
      element.target.setAttribute("src", element.target.dataset.img)
    }
  })
}

let observer = new IntersectionObserver(callback);

// let observer2 = new IntersectionObserver(getPaginatedTrendingMovies);

// Data

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  header: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    "api_key": API_KEY,
    "languague": navigator.language || "es-ES"
  }
});

function likedMovieList () {
  const item = JSON.parse(localStorage.getItem("liked_movies"));
  let movies;

  if (item) {
    movies = item
  } else {
    movies = {}
  }

  return movies;
}

function likeMovie (movie) {

  const likedMovies = likedMovieList()

  if (likedMovies[movie.id]) {
    delete likedMovies[movie.id];
  } else {
    likedMovies[movie.id] = movie
  }
  localStorage.setItem("liked_movies", JSON.stringify(likedMovies))
  getFavoriteMovies ()
}


// Utils

function createMovieList(
  movies, 
  container, 
  {
    lazyLoad = false, 
    clean = true
  } = {}
) {
  if(clean){
    container.innerHTML = ""
  } 
  
  console.log (movies)
  movies.forEach(movie => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    
    if (lazyLoad) {
      movieImg.setAttribute("data-img", `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
      observer.observe(movieImg)
    } else {
      movieImg.setAttribute("src", `https://image.tmdb.org/t/p/w300/${movie.poster_path}`)
    }

    movieImg.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`
    })

    movieImg.addEventListener("error", () => {
      movieContainer.classList.add("movie-container--error")
      movieContainer.classList.remove("movie-container")
      movieContainer.innerHTML = `<p>${movie.title}</p>`
    })

    const movieBtn = document.createElement("button");
    if (likedMovieList()[movie.id]) {
      movieBtn.classList.add("movie-btn--liked");
      movieBtn.classList.add("movie-btn");
    } else {
      movieBtn.classList.add("movie-btn");
    }
    movieBtn.addEventListener("click", () => {
      movieBtn.classList.toggle("movie-btn--liked");
      likeMovie(movie);
    });

    movieContainer.appendChild(movieBtn)
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
    
  });

  // observer2.observe(footer)
}

function createCategories (categories, container) {
  
  container.innerHTML = ""
  categories.forEach(category => {

  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("category-container");

  const categoryTitle = document.createElement("h3");
  categoryTitle.classList.add("category-title");
  categoryTitle.setAttribute("id", "id" + category.id);
  categoryTitle.addEventListener("click" , () => {
    location.hash = `#category=${category.id}-${category.name}`
  })
  
  const categoryTitleText = document.createTextNode(category.name)
  
  categoryTitle.appendChild(categoryTitleText)
  categoryContainer.appendChild(categoryTitle);
  container.appendChild(categoryContainer);
});

}

function scrollIsBotom () {
  const { 
    scrollTop, 
    scrollHeight, 
    clientHeight 
  } = document.documentElement;

  return ((scrollTop + clientHeight) >= (scrollHeight - 15))
}

function getFavoriteMovies () {
  const movies = likedMovieList()
  const moviesArray = Object.values(movies)
  if (movies != {}) {
    createMovieList(moviesArray, favoriteMovieList, { lazyLoad : true , clean : true } )
  }
}

async function getTrendingMoviesPreview () {
  const {data} = await api(`trending/movie/day`);
  const movies = data.results;

createMovieList(movies, trendingPreviewMovieList, { lazyLoad : true , clean : true } )
}

async function getTrendingMovies () {
  const {data} = await api(`trending/movie/day`);
  const movies = data.results;
  maxPage = data.total_pages
  page = 0

createMovieList(movies, genericListSection, { lazyLoad : true , clean : true } )

}

async function getPaginatedTrendingMovies (/*entries*/) {
  //  console.log (entries)
    // if (entries[0].isIntersecting) {
    //   page++
    // const {data} = await api(`trending/movie/day`, {
    //   params: {
    //     page: page
    //   }
    // });
    // createMovieList(data, genericListSection, { lazyLoad : true , clean : false } )
    // }
  
    // const { 
    //   scrollTop, 
    //   scrollHeight, 
    //   clientHeight 
    // } = document.documentElement;
  
    // const scrollIsBotom =(scrollTop + clientHeight) >= (scrollHeight - 15)
  
    if (scrollIsBotom () && page < maxPage) {
  
      page++
      const {data} = await api(`trending/movie/day`, {
        params: {
          page: page
        } 
      }
      )
      const movies = data.results;;
    createMovieList(movies, genericListSection, { lazyLoad : true , clean : false } )
  
    }
  
    
    
  }

async function getCategoriesPreview () {
  const {data} = await api(`genre/movie/list`);
  const categories = data.genres;
  categoriesPreviewList.innerHTML = ""

  createCategories (categories, categoriesPreviewList);

  
}

async function getMoviesByCategory(id) {

  page = 0

  const {data} = await api(`discover/movie`, {
    params: {
      with_genres: id,
      sort_by : "popularity.desc"
    }
  });
  const movies = data.results;
  maxPage = data.total_pages

  createMovieList(movies, genericListSection, { lazyLoad : true , clean : true })
}

async function getPaginatedMoviesByCategory (id) {

  if (scrollIsBotom () && page < maxPage) {
    page++

  const {data} = await api(`discover/movie`, {
    params: {
      with_genres: id,
      sort_by : "popularity.desc",
      page : page
    }
  })
  const movies = data.results;;

  createMovieList(movies, genericListSection, { lazyLoad : true , clean : false })
  }
}

async function getMoviesBySearch(keyword) {

  page = 0

  const {data} = await api(`search/movie`, {
    params: {
      query: keyword,
    }
  });
  maxPage = data.total_pages
  const movies = data.results;

  createMovieList(movies, genericListSection, { lazyLoad : true , clean : true })
}

async function getPaginatedMoviesBySearch (keyword) {

  if(scrollIsBotom () && page < maxPage) {

    page++;

    const {data} = await api(`search/movie`, {
      params: {
        query: keyword,
        page: page
      }
    });
    const movies = data.results;
  
    createMovieList(movies, genericListSection, { lazyLoad : true , clean : false })
  }
}

async function getMovieById (id) {
  const { data } = await api(`movie/${id}`);
  
  movieDetailTitle.textContent = data.title;
  movieDetailScore.textContent = data.vote_average.toFixed(1);
  movieDetailDescription.textContent = data.overview

  const movieURL = `https://image.tmdb.org/t/p/w500/${data.poster_path}`
  headerSection.style.background = `
    linear-gradient(
      180deg, 
      rgba(0, 0, 0, 0.35) 19.27%, 
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieURL})
  `

  createCategories(data.genres , movieDetailCategoriesList)
  getSimilarMovies (id)

}

async function getSimilarMovies (id) {
  const { data } = await api(`movie/${id}/similar`);
  const movies = data.results;

  createMovieList(movies , relatedMoviesContainer, true)
  relatedMoviesContainer.scroll(0,0)
}