import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import { showStackTopRight } from './notify';
import debounce from 'lodash.debounce';
import uxForModal from '../templates/UX-for-modal.hbs';
import refs from './refs';

window.addEventListener('click', showLargeImg);

function showLargeImg({ target }) {
  if (target.hasAttribute('data-source')) {
    let currentTarget = target;
    let modal = null;
    const urlLargeImg = target.getAttribute('data-source');
    const debounceFunction = debounce(controllByButtons, 300);
    currentTarget.scrollIntoView({ block: 'center', behavior: 'smooth' });
    createModal(urlLargeImg);

    function createModal(url) {
      modal = basicLightbox.create(`<img class="large-image" src="${url}">`, {
        onClose: () => {
          window.removeEventListener('keyup', debounceFunction);
        },
      });
      modal.show();
      window.addEventListener('keyup', debounceFunction);


      refs.bodyRef.insertAdjacentHTML('beforeend', uxForModal());
      refs.controlModalRef = document.querySelector('.control-modal');
      console.log(refs.controlModalRef);


    }

    function controllByButtons(event) {
      event.preventDefault();
      if (event.code === 'Escape') {
        onEsc();
      }
      if (event.code === 'ArrowRight') {
        nextImg();
      }
      if (event.code === 'ArrowLeft') {
        previousImg();
      }
    }

    function onEsc() {
      modal.close();
      window.removeEventListener('keyup', debounceFunction);
    }

    function nextImg() {
      function hasNextImg() {
        return (
          currentTarget.parentElement.parentElement.nextElementSibling !== null
        );
      }
      if (hasNextImg()) {
        const nextTarget =
          currentTarget.parentElement.parentElement.nextElementSibling
            .firstElementChild.firstElementChild;
        modal.close();
        createModal(nextTarget.getAttribute('data-source'));
        currentTargetSettings(nextTarget);
        return;
      }
      showStackTopRight('lastImage');
    }

    function previousImg() {
      function checkPreviousImg() {
        return (
          currentTarget.parentElement.parentElement.previousElementSibling !==
          null
        );
      }
      if (checkPreviousImg()) {
        const previousTarget =
          currentTarget.parentElement.parentElement.previousElementSibling
            .firstElementChild.firstElementChild;
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
