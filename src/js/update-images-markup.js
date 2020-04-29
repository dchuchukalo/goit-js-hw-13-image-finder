import imageTpl from '../templates/image-tpl.hbs';
import refs from './refs';

function updateImagesMarkup(images) {
  const markup = imageTpl(images);
  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
}

export default updateImagesMarkup;
