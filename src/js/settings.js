
export const select = {

  templateOf: {
    player: "#template-player",
    resultCounter: "#template-result",
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
  },
 search: {
  input: '[name="search"]',
  pagetop: '.pagetop',
  audio: '.audio-player',

  }
};

export const classNames = {
  search: {
    standardPlayer: 'player',
    searchPlayer: 'player2',
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
    bookings: 'bookings',
  },
};
  export const templates = {
    player: Handlebars.compile(document.querySelector(select.templateOf.player).innerHTML),
    resultCounter: Handlebars.compile(document.querySelector(select.templateOf.resultCounter).innerHTML),
};