
export const select = {

  templateOf: {
    player: '#template-player',
    resultCounter: '#template-result',
    categories: '#template-categories',
    categoriesSearch: '#template-categorie-search',
  },
  
  nav: {
    links: '.main-nav a',
  },

  containerOf: {
    pages: '#pages',
    home: '.home-wrapper',
    search: '.search-wrapper',
    discover: '.discover-wrapper',
    result: '.result',
    categories: '.categories',
    categoriesNames: '.categories-list a',
    categoriesSearch: '.categorie-search'
  },
  search: {
    input: '[name="search"]',
    pagetop: '.pagetop',
    categorieSearch: '.categorie-search',
    audio: '.audio-player',
  }
};

export const classNames = {
  search: {
    standardPlayer: 'player',
    searchPlayer: 'player2',
    discoveryPlayer: 'player3',
  },
  categories: {
    notcurrent: 'notcurrent',
    selected: 'selected'
  },
 
  nav: {
    active: 'active',
    bold: 'bold',
  },
  pages: {
    active: 'active',
  }
};

export const settings = {
  
  db: {
    url: '//localhost:3131',
    homePage: 'home',
    songs: 'songs',
  },
};
export const templates = {
  player: Handlebars.compile(document.querySelector(select.templateOf.player).innerHTML),
  resultCounter: Handlebars.compile(document.querySelector(select.templateOf.resultCounter).innerHTML),
  categories: Handlebars.compile(document.querySelector(select.templateOf.categories).innerHTML),
  categorieSearch: Handlebars.compile(document.querySelector(select.templateOf.categoriesSearch).innerHTML),
};