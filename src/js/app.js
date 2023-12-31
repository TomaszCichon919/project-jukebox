import { settings, select, classNames, templates } from './settings.js';
import Song from './components/Song.js';
import Discover from './components/Discover.js';
import Search from './components/Search.js';
import utils from './utils.js';
let shuffleBin = [];
const categoriesContainer = { categories: [] };
const app = {


  convertTextToUppercase: function (element) {
    const thisApp = this;
    if (element.nodeType === Node.TEXT_NODE) {

      element.textContent = element.textContent.toUpperCase();
    } else if (element.nodeType === Node.ELEMENT_NODE) {

      const childNodes = element.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        thisApp.convertTextToUppercase(childNodes[i]);
      }
    }
  },

  toUpperCase: function () {

    const thisApp = this;

    thisApp.capslock = document.querySelectorAll('.header, .main-nav, .subscribe-text, .new-album, .join, .page-name, .search-btn');

    thisApp.capslock.forEach((div) => {
      thisApp.convertTextToUppercase(div);
    });

  },

  initPages: function () {
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;

    thisApp.navLinks = document.querySelectorAll('.main-nav a');

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

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
      link.classList.toggle(classNames.nav.bold, link.getAttribute('href') == '#' + pageId);
    }

  },

  initPlayer: function () {
    const thisApp = this;


    for (let songData in thisApp.data.songs) {
      new Song(thisApp.data.songs[songData].id, thisApp.data.songs[songData]);
    }

  },
  initShuffler() {
    const thisApp = this;
    thisApp.discoverWrapper = document.querySelector(select.containerOf.discover);
    thisApp.discoverWrapper.innerHTML = '';
    for (const songData in thisApp.data.songs) {


      shuffleBin.push(thisApp.data.songs[songData].id);

    }
    const randomIndex = (Math.floor(Math.random() * (shuffleBin.length) + 1));

    for (const songData in thisApp.data.songs) {
      if (thisApp.data.songs[songData].id == randomIndex) {
        thisApp.discover = new Discover(thisApp.data.songs[songData], thisApp.choiceContainer);
      }
    }

  },

  prepareAllcategories() {
    const thisApp = this;
    for (const songData in thisApp.data.songs) {
      for (let i = 0; i < thisApp.data.songs[songData].categories.length; i++) {
        if (!categoriesContainer.categories.includes(thisApp.data.songs[songData].categories[i])) {
          categoriesContainer.categories.push(thisApp.data.songs[songData].categories[i]);
        }
      }
    }
    const generatedHTML = templates.categories(categoriesContainer);

    thisApp.element = utils.createDOMFromHTML(generatedHTML);

    const categoriesWrapper = document.querySelector(select.containerOf.categories);

    categoriesWrapper.appendChild(thisApp.element);

    // generated categorie select in Search //

    const generatedHTML2 = templates.categorieSearch(categoriesContainer);

    thisApp.categorieElement = utils.createDOMFromHTML(generatedHTML2);


    const categorieSelect = document.querySelector(select.containerOf.categoriesSearch);

    categorieSelect.appendChild(thisApp.categorieElement);

    // generated categorie select in Search //

    thisApp.categoriesNames = document.querySelectorAll(select.containerOf.categoriesNames);

    thisApp.players = document.querySelector(select.containerOf.home).children;

    for (let categorie of thisApp.categoriesNames) {

      categorie.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();
        if (event.target.classList.contains(classNames.categories.selected)) {
          event.target.classList.remove(classNames.categories.selected);
          for (let player of thisApp.players) {
            player.classList.remove(classNames.categories.notcurrent);
          }
        } else {
          for (let categorie of thisApp.categoriesNames) {
            if (categorie.classList.contains(classNames.categories.selected)) {
              categorie.classList.remove(classNames.categories.selected);
            }
          }
          categorie.classList.add(classNames.categories.selected);
          const id = clickedElement.getAttribute('id');
          thisApp.activateCategory(id);
        }
      });
    }
  },

  activateCategory: function (id) {
    const thisApp = this;
    for (let player of thisApp.players) {
      player.classList.remove(classNames.categories.notcurrent);
      if (!player.classList.contains(id)) {
        player.classList.add(classNames.categories.notcurrent);
      }
    }
  },

  initWidget() {
    const thisApp = this;
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.player',
      stopOthersOnPlay: true
    });
    thisApp.preferenceChecker();

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

        thisApp.data.songs = parsedResponse;

        thisApp.initPlayer();
        thisApp.initShuffler();
        thisApp.prepareAllcategories();
      });
  },

  initSearch: function () {
    const thisApp = this;
    const searchElem = document.querySelector(select.containerOf.search);
    thisApp.search = new Search(searchElem, categoriesContainer);
  },

  preferenceChecker() {
    const thisApp = this;
    const catArray = [];
    const playerContainer = document.querySelectorAll('[text="play-file"]');
    for (let player of playerContainer) {
      player.addEventListener('play', function (event) {
        const categorieAttribute = event.target.classList.toString();
        const singleCategory = categorieAttribute.split(' ');
        const newArray = singleCategory.filter(item => item !== '');
        for (let i = 0; i < newArray.length; i++) {
          catArray.push(newArray[i]);
        }
        thisApp.countElements(catArray);

      });
    }
  },

  countElements(arr) {
    const thisApp = this;
    const elementCount = {};

    arr.forEach((element) => {
      if (element in elementCount) {
        elementCount[element]++;
      } else {
        elementCount[element] = 1;
      }
    });
    thisApp.mostChosenCategory(elementCount);
  },


  mostChosenCategory(obj) {
    const thisApp = this;
    thisApp.mostFrequentCategory = null;
    let categoryCount = -1;
    let draw = 'draw';

    for (const cat in obj) {
      if (obj.hasOwnProperty(cat)) {
        const value = obj[cat];
        if (value > categoryCount) {
          categoryCount = value;
          thisApp.mostFrequentCategory = cat;
        } else if (value === categoryCount) {
          thisApp.mostFrequentCategory = draw;
        }
      }
    }
    thisApp.initShufflerWithCategory();
  },

  initShufflerWithCategory() {
    const thisApp = this;
    shuffleBin = [];
    if (thisApp.mostFrequentCategory == 'draw') {
      for (const songData in thisApp.data.songs) {
        shuffleBin.push(thisApp.data.songs[songData].id);
      }
    } else {
      for (const songData in thisApp.data.songs) {
        for (let i = 0; i < thisApp.data.songs[songData].categories.length; i++) {
          if (thisApp.data.songs[songData].categories[i] == thisApp.mostFrequentCategory) {
            shuffleBin.push(thisApp.data.songs[songData].id);
          }
        }
      }
    }
    const randomIndex = (Math.floor(Math.random() * (shuffleBin.length)));

    thisApp.discoverWrapper.innerHTML = '';

    for (const songData in thisApp.data.songs) {
      if (thisApp.data.songs[songData].id == shuffleBin[randomIndex]) {
        thisApp.discover = new Discover(thisApp.data.songs[songData]);
      }
    }

  },


  init: function () {
    const thisApp = this;
    thisApp.initData();
    thisApp.toUpperCase();
    thisApp.initPages();
    thisApp.initSearch();
    setTimeout(function () { thisApp.initWidget(); }, 500);



  },

};

app.init();