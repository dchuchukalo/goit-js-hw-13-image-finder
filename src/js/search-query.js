import refs from './refs';
import uploadRequest from './infinite-scroll';

refs.searchFormRef.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const query = refs.inputRef.value;
  if (query.length > 0) {
    clearImagesContainer();
    uploadRequest(query);
  }
}

function clearImagesContainer() {
  refs.galleryRef.innerHTML = '';
}
