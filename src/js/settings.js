
export const select = {

  templateOf: {
    player: "#template-player",
  },
  
  nav: {
    links: '.main-nav a',
  },

  containerOf: {
    pages: '#pages',
    home: '.home-wrapper',
    search: '.search-wrapper',
    discover: '.discover-wrapper',
  },

};

export const classNames = {
  menuProduct: {
    wrapperActive: 'active',
    imageVisible: 'active',
  },
      
  cart: {
    wrapperActive: 'active',
  },
  booking: {
    loading: 'loading',
    tableBooked: 'booked',
    tableSelect: 'selected'
  },
  nav: {
    active: 'active',
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
};