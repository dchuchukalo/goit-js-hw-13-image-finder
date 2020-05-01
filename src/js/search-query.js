import { showStackTopRight } from './notify';
import refs from './refs';
import uploadRequest from './infinite-scroll';

refs.searchFormRef.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const query = refs.inputRef.value;
  clearImagesContainer();

  if (query.length === 0) {
    showStackTopRight('error')
  }
  if (query.length > 0) {
    uploadRequest(query);
    showStackTopRight('success')
  }
}

function clearImagesContainer() {
  refs.galleryRef.innerHTML = '';
}
