import { showStackTopRight } from './notify';
import InfiniteScroll from 'infinite-scroll';
import imageTpl from '../templates/image-tpl.hbs';
import refs from './refs';

const infScroll = new InfiniteScroll(refs.galleryRef, {
  path: function () {
    return (
      `https://cors-anywhere.herokuapp.com/pixabay.com/api/` +
      `?image_type=photo&orientation=horizontal&q=${this.options.query}` +
      `&page=${this.pageIndex}&per_page=12&key=${this.options.apiKey}`
    );
  },
  responseType: 'text',
  status: '.page-load-status',
  history: false,
  apiKey: '16252810-97a93e8d6856e870fd6ba2eb3',
  query: '',
});

const proxyElem = document.createElement('ul');

infScroll.on('load', function (response) {
  const { hits } = JSON.parse(response);
  if (hits.length === 0 && refs.galleryRef.childElementCount === 0) {
    showStackTopRight('notice')
    return
  }

  const itemsHTML = imageTpl(hits);
  proxyElem.innerHTML = itemsHTML;
  const items = proxyElem.querySelectorAll('.gallery-item');
  infScroll.appendItems(items);
});

function uploadRequest(value) {
  resetPage();
  infScroll.options.query = value;
  infScroll.loadNextPage();
}

function resetPage() {
  infScroll.pageIndex = 1;
}

export default uploadRequest;
