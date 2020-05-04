import refs from '../../js/refs';
import searchFormTemplate from '../../templates/search-form.hbs';

const markup = searchFormTemplate();

refs.searchFormJsRef.innerHTML = markup;
refs.searchFormRef = document.querySelector('#search-form');
refs.inputRef = document.querySelector('#search');
refs.clearBtnRef = document.querySelector('.clear-btn');


