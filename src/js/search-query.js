import { showStackTopRight } from './notify';
import refs from './refs';
import uploadRequest from './infinite-scroll';

refs.searchFormRef.addEventListener('submit', onSubmit);
refs.clearBtnRef.addEventListener('click', clearForm);

function onSubmit(event) {
  event.preventDefault();
  const query = refs.inputRef.value;
  clearImagesContainer();

  if (query.length === 0) {
    showStackTopRight('error');
  }
  if (query.length > 0) {
    uploadRequest(query);
    showStackTopRight('success');
  }
}

function clearForm() {
  clearImagesContainer();
  refs.inputRef.value = ''
}

function clearImagesContainer() {
  refs.galleryRef.innerHTML = '';
}
