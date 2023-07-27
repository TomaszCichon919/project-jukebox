import { settings, select, classNames } from './settings.js';
import Song from './components/Song.js';
import Discover from './components/Discover.js';
import Search from './components/Search.js';
let shuffleBin = [];
const app = {

  
  convertTextToUppercase: function(element){
    const thisApp=this;
    if (element.nodeType === Node.TEXT_NODE) {
      
      element.textContent = element.textContent.toUpperCase();
    } else if (element.nodeType === Node.ELEMENT_NODE) {
     
      const childNodes = element.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        thisApp.convertTextToUppercase(childNodes[i]);
      }
    }
  },

  toUpperCase: function() {

    const thisApp = this;
   
    thisApp.capslock = document.querySelectorAll('.header, .main-nav');
    console.log('capslock', thisApp.capslock);
  
    thisApp.capslock.forEach((div) => {
      thisApp.convertTextToUppercase(div);
    });
  
  },
  
  initPages: function () {
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;


    thisApp.navLinks = document.querySelectorAll('.main-nav a');

    const idFromHash = window.location.hash.replace('#/', '');


    let pageMatchingHash = thisApp.pages[2].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);
    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        /* get pagfe id from href */
        const id = clickedElement.getAttribute('href').replace('#', '');
        /* run thisApp.activatePAge with that id */
        thisApp.activatePage(id);

        /* change url hash*/
        window.location.hash = '#/' + id;
      });
    }

  },

  activatePage: function (pageId) {
    const thisApp = this;
    /* add class active to maching pages, remove from non-matching */
    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    /* add class active to maching links, remove from non-matching */
    for (let link of thisApp.navLinks) {
      link.classList.toggle(classNames.nav.active, link.getAttribute('href') == '#' + pageId);
    }

  },

  initPlayer: function () {
    const thisApp = this;
    //console.log('thisApp.data:', thisApp.data);

    for (let songData in thisApp.data.songs) {
      new Song(thisApp.data.songs[songData].id, thisApp.data.songs[songData]);
      //console.log(songData);
    }

  },
  initShuffler() {
    console.log('hello333');
    const thisApp = this;
    for (const songData in thisApp.data.songs) {
      shuffleBin.push(thisApp.data.songs[songData].id);

    }
    //console.log('shufflebin', shuffleBin);
    //console.log('shufflebin length', shuffleBin.length);
    const randomIndex = (Math.floor(Math.random() * (shuffleBin.length)+1));
    //console.log("randomindex", randomIndex);

    for (const songData in thisApp.data.songs) {
      if (thisApp.data.songs[songData].id == randomIndex) {
        console.log('random song', thisApp.data.songs[songData]);
        thisApp.discover = new Discover(thisApp.data.songs[songData]);
      };
    };

  },

  initWidget() {
    GreenAudioPlayer.init({
      selector: '.player',
      stopOthersOnPlay: true
    });

  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.songs;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        // console.log('parsedResponse', parsedResponse);

        /* save parsedResponse as thisApp.data.products */
        thisApp.data.songs = parsedResponse;

        // /* execute initMenu method */
        thisApp.initPlayer();
        thisApp.initShuffler();
        console.log('hello', thisApp.data);

      });
    //console.log("thisApp.data", JSON.stringify(thisApp.data));
  },

  initSearch: function () {
    const thisApp = this;
    const searchElem = document.querySelector(select.containerOf.search);
    thisApp.search = new Search(searchElem);
  },



  init: function () {
    const thisApp = this;
    // console.log('*** App starting ***');
    // console.log('thisApp:', thisApp);
    // console.log('classNames:', classNames);
    // console.log('settings:', settings);
    // console.log('templates:', templates);
    thisApp.initData();
    thisApp.toUpperCase();
    thisApp.initPages();
    thisApp.initSearch();
    setTimeout(function () { thisApp.initWidget(); }, 900);


  },

};


app.init();