import refs from './refs';
import apiService from './api-service';
import updateImagesMarkup from './update-images-markup';

refs.searchFormRef.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const query = refs.inputRef.value;
  clearArticlesContainer();
  if (query.length > 0) {
    apiService.query = query;
    apiService.resetPage();
    fetchArticles();
  }
}

function fetchArticles() {
  apiService.fetchArticles().then(res => updateImagesMarkup(res));
  apiService.incrementPage();
  console.log(apiService.url);
}

function clearArticlesContainer() {
  refs.galleryRef.innerHTML = '';
}
