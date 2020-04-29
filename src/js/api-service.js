import axios from 'axios';

const apiKey = '16252810-97a93e8d6856e870fd6ba2eb3';

export default {
  searchQuery: '',
  page: 1,

  async fetchArticles() {
    axios.defaults.baseURL = this.url;

    const {
      data: { hits },
    } = await axios.get();
    return hits;
  },

  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
  get url() {
    return (
      `https://pixabay.com/api/?image_type=photo` +
      `&orientation=horizontal&q=${this.searchQuery}&page=${this.page}` +
      `&per_page=12&key=${apiKey}`
    );
  },
};
