const cr = (id) => document.querySelector(id);

//Sections
const headerSection = cr("#header");
const trendingPreviewSection = cr("#trendingPreview");
const categoriesPreviewSection = cr("#categoriesPreview");
const genericListSection = cr("#genericList");
const movieDetailSection = cr("#movieDetail");
const likedSection = cr("#liked")
const footer = cr("footer")

// Lists & Containers
const searchForm = cr("#searchForm");
const trendingPreviewHeader = cr(".trendingPreview-header");
const trendingPreviewMovieList = cr(".trendingPreview-movieList");
const categoriesPreviewList = cr(".categoriesPreview-list");
const movieContainer = cr(".movie-container");
const movieDetailCategoriesList = cr("#movieDetail .categories-list");
const relatedMoviesContainer = cr(".relatedMovies-scrollContainer");
const favoriteMovieList = cr(".liked-movieList")

// Elements
const headerArrow = cr(".header-arrow");
const headerTitle = cr(".header-title");
const headerTitleCategoryView = cr(".header-title--categoryView");
const searchFormInut = cr("#searchForm input");
const searchFormButton = cr("#searchBtn");
const trendingPreviewBtn = cr(".trendingPreview-btn");
const movieDetailTitle = cr(".movieDetail-title");
const movieDetailScore = cr(".movieDetail-score");
const movieDetailDescription = cr(".movieDetail-description");

