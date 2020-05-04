import refs from './refs';

const options = {
  rootMargin: '-138px',
};

const onEntry = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio === 0) {
      refs.searchFormJsRef.classList.add('fixed');
    }
    if (entry.intersectionRatio !== 0) {
      refs.searchFormJsRef.classList.remove('fixed');
    }
  });
};

const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.lineRef);
