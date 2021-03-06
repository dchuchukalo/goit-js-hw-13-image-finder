import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import { showStackTopRight } from './notify';
import debounce from 'lodash.debounce';
import uxForModal from '../templates/UX-for-modal.hbs';
import refs from './refs';
import clearSearch from '../js/search-query'

window.addEventListener('click', showLargeImg);

function showLargeImg({ target }) {
  if (target.hasAttribute('data-source')) {
    let currentTarget = target;
    let modal = null;
    const urlLargeImg = target.getAttribute('data-source');
    const debounceControlByScreen = debounce(controlByScreen, 300);
    const debounceControlByButtons = debounce(controlByButtons, 300);
    currentTarget.scrollIntoView({ block: 'center', behavior: 'smooth' });
    createModal(urlLargeImg);

    function createModal(url) {
      modal = basicLightbox.create(`<img class="large-image" src="${url}">`, {
        onClose: () => {
          window.removeEventListener('keyup', debounceControlByButtons);
          window.removeEventListener('click', debounceControlByScreen);
          controlModalRef.remove();
        },
      });
      modal.show();
      window.addEventListener('keyup', debounceControlByButtons);
      refs.bodyRef.insertAdjacentHTML('beforeend', uxForModal());
      const controlModalRef = document.querySelector('.control-modal');

      window.addEventListener('click', debounceControlByScreen);
      refs.prevBtnRef = document.querySelector('.prev-btn');
      refs.nextBtnRef = document.querySelector('.next-btn');
    }

    function controlByScreen(event) {
      if (event.target === refs.nextBtnRef) {
        nextImg();
        return;
      }
      if (event.target === refs.prevBtnRef) {
        previousImg();
        return;
      }
    }

    function controlByButtons(event) {
      event.preventDefault();
      if (event.code === 'Escape') {
        onEsc();
        return
      }
      if (event.code === 'ArrowRight') {
        nextImg();
        return
      }
      if (event.code === 'ArrowLeft') {
        previousImg();
        return
      }
    }

    function onEsc() {
      modal.close();
      window.removeEventListener('keyup', debounceControlByButtons);
    }

    function nextImg() {
      function hasNextImg() {
        return (
          currentTarget.parentElement.parentElement.parentElement.nextElementSibling !== null
        );
      }
      if (hasNextImg()) {
        const nextTarget =
          currentTarget.parentElement.parentElement.parentElement.nextElementSibling
            .firstElementChild.firstElementChild.firstElementChild;
        modal.close();
        createModal(nextTarget.getAttribute('data-source'));
        currentTargetSettings(nextTarget);
        return;
      }
      // showStackTopRight('lastImage');
    }

    function previousImg() {
      function checkPreviousImg() {
        return (
          currentTarget.parentElement.parentElement.parentElement.previousElementSibling !==
          null
        );
      }
      if (checkPreviousImg()) {
        const previousTarget =
          currentTarget.parentElement.parentElement.parentElement.previousElementSibling
            .firstElementChild.firstElementChild.firstElementChild;
        modal.close();
        createModal(previousTarget.getAttribute('data-source'));
        currentTargetSettings(previousTarget);
        return;
      }
      showStackTopRight('firstImage');
    }
    function currentTargetSettings(value) {
      currentTarget = value;
      currentTarget.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }
}
