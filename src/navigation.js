let maxPage;
let page = 1;
let infiniteScroll;

searchFormButton.addEventListener("click", () => {
  location.hash = `#search=${searchFormInut.value}`
})

trendingPreviewBtn.addEventListener("click", () => {
  location.hash = "#trends"
})

headerArrow.addEventListener ("click", () => {
  location.hash = window.history.go(-1);
})

window.addEventListener("DOMContentLoaded", navigatorx, false);
window.addEventListener("hashchange", navigatorx, false);

function navigatorx () {
  console.log({location});

  if(infiniteScroll) {
    window.removeEventListener("scroll", infiniteScroll, { passive: false });
    infiniteScroll = undefined;
  }

  if (location.hash.startsWith("#trends")) {
    trendsPage()
  } else if (location.hash.startsWith("#search=")) {
    searchPage()
  } else if (location.hash.startsWith("#movie=")) {
    moviePage()
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage()
  } else {
    homePage()
  }

  if (infiniteScroll) {
    window.addEventListener("scroll", infiniteScroll, false);
  }
  
}

function homePage () {

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  headerArrow.classList.add("inactive");
  headerArrow.classList.remove("header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerTitleCategoryView.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");

  genericListSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  likedSection.classList.remove("inactive")
  favoriteMovieList.classList.remove("inactive")

  getCategoriesPreview()
  getTrendingMoviesPreview()
  getFavoriteMovies()
  window.scroll(0,0)
}

function searchPage () {
  console.log("Search");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  headerArrow.classList.remove("inactive");
  headerArrow.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerTitleCategoryView.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericListSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  likedSection.classList.add("inactive")
  favoriteMovieList.classList.add("inactive")

  let [ _ , query] = location.hash.split("=")
  const realQuery = query.replaceAll("%20", " ")
  getMoviesBySearch (realQuery)
  console.log(realQuery)
  window.scroll(0,0)

  infiniteScroll = () => {
    getPaginatedMoviesBySearch(realQuery)}
}

function moviePage () {
  console.log("Movie");

  headerSection.classList.add("header-container--long");
  // headerSection.style.background = "";
  headerArrow.classList.remove("inactive");
  headerArrow.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerTitleCategoryView.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericListSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  likedSection.classList.add("inactive")
  favoriteMovieList.classList.add("inactive")

  let [ _ , id] = location.hash.split("=")

  getMovieById (id)

  window.scroll(0,0)
}

function trendsPage () {
  console.log("TRENDS");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  headerArrow.classList.remove("inactive");
  headerArrow.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerTitleCategoryView.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericListSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  likedSection.classList.add("inactive")
  favoriteMovieList.classList.add("inactive")

  getTrendingMovies()

  infiniteScroll = getPaginatedTrendingMovies
}

function categoriesPage () {
  console.log("Categories");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  headerArrow.classList.remove("inactive");
  headerArrow.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerTitleCategoryView.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericListSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  likedSection.classList.add("inactive")
  favoriteMovieList.classList.add("inactive")

  const url = location.hash.split("=");
  const [categoryId, categoryName] = url[1].split("-")

  console.log(categoryId)
  console.log(categoryName)
  headerTitleCategoryView.innerText = categoryName.replace("%20", " ")
  getMoviesByCategory(categoryId);
  window.scroll(0,0)

  infiniteScroll = () => {
    getPaginatedMoviesByCategory(categoryId)}
}