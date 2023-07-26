import {settings, templates, select, classNames} from '../settings.js';
import utils from '../utils.js';
class Search {
  constructor (element){
    const thisSearch = this;
    thisSearch.data = {};
    thisSearch.box = [];
    thisSearch.getData ();
    thisSearch.getElements(element);
    thisSearch.initActions ();
    //setTimeout(function(){console.log ('hello22', thisSearch.data);}, 1000);
  }

  getData (){
    const thisSearch = this;

    const url = settings.db.url + '/' + settings.db.songs;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        // console.log('parsedResponse', parsedResponse);

        /* save parsedResponse as thisApp.data.products */
        thisSearch.data.songs = parsedResponse;

        
        // /* execute initMenu method */
        thisSearch.initAllSongData();
        console.log ('hello22', thisSearch.data);

      });
    //console.log("thisApp.data", JSON.stringify(thisApp.data));
  }

  getElements (element) {
    const thisSearch = this;
    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    thisSearch.dom.input = document.querySelector(select.search.input);
    thisSearch.dom.pageTop = document.querySelector(select.search.pagetop);
   
    
    
    
  }

  initActions () {
    const thisSearch = this;
    thisSearch.dom.pageTop.addEventListener('submit', function (event) {
      event.preventDefault();
      console.log ('there was a click');
      console.log('searched text', thisSearch.dom.input.value);
      thisSearch.searchFilter(thisSearch.box, thisSearch.dom.input.value);

    });
  }

  searchFilter (array, searchString) {
    const thisSearch = this;
    const searchTerm = searchString.toLowerCase();
    thisSearch.result =  array.filter(item => item.toLowerCase().includes(searchTerm));
    console.log("result", thisSearch.result);
    thisSearch.generatePlayer();
  }

  generatePlayer() {
    const thisSearch = this;
    console.log('data', thisSearch.data);
    console.log("given result", thisSearch.result);
    thisSearch.dom.wrapper.innerHTML = '';
    for (let songData in thisSearch.data.songs){
      if(thisSearch.data.songs[songData].title === thisSearch.result[0] || thisSearch.data.songs[songData].author === thisSearch.result[0]) {
        console.log('selected song', thisSearch.data.songs[songData]);


        const generatedHTML = templates.player(thisSearch.data.songs[songData]);
        // //console.log(generatedHTML);
        // /* create element using utils.createElementFromHTML */
        thisSearch.element = utils.createDOMFromHTML(generatedHTML);
        // //console.log("thissong element", thisSong.element);
        // /* find menu container */
        const playerContainer = document.querySelector(select.containerOf.search);
        // /* add element to menu */
        playerContainer.appendChild(thisSearch.element);
        break;
      } else {
        console.log("no result found");
      }
    }
    console.log('elelent', thisSearch.dom.GreenAudioPlayer);
    thisSearch.dom.GreenAudioPlayer = thisSearch.dom.wrapper.querySelector(select.search.audio);
    thisSearch.dom.GreenAudioPlayer.classList.remove(classNames.search.standardPlayer);
    thisSearch.dom.GreenAudioPlayer.classList.add(classNames.search.searchPlayer);
    thisSearch.initWidget ();
    //thisSearch.result = [];
    console.log('end result', thisSearch.result);
  }

  initWidget () {
    GreenAudioPlayer.init({
      selector: '.player2',
      stopOthersOnPlay: true
    });
  }


  initAllSongData () {
    const thisSearch = this;
    //console.log('thisApp.data:', thisApp.data);
    
    for (let songData in thisSearch.data.songs) {
      thisSearch.box.push(thisSearch.data.songs[songData].title);
      thisSearch.box.push(thisSearch.data.songs[songData].author);  
      console.log('box', thisSearch.box);
    }
  }
}

   
   
    
     export default Search;
    // {
    //     "posts": [
    //       { "id": 1, "title": "json-server", "author": "typicode" }
    //     ],
    //     "comments": [
    //       { "id": 1, "body": "some comment", "postId": 1 }
    //     ],
    //     "profile": { "name": "typicode" }
    //   }

    // http://localhost:3131/songs?title_g

// function filterElementsBySetOfLetters(array, setOfLetters) {
//     // Przygotowujemy tablicę na elementy spełniające warunek
//     const filteredElements = [];
  
//     // Iterujemy przez tablicę
//     for (const element of array) {
//       // Sprawdzamy, czy element zawiera wszystkie litery ze zbioru
//       const elementContainsSet = setOfLetters.every(letter => element.includes(letter));
      
//       // Jeśli tak, dodajemy element do tablicy wynikowej
//       if (elementContainsSet) {
//         filteredElements.push(element);
//       }
//     }
  
//     return filteredElements;
//   }
  
//   // Przykład użycia funkcji
//   const myArray = ['apple', 'banana', 'orange', 'kiwi', 'grape'];
//   const setOfLettersToFind = ['a', 'p', 'l', 'e'];
  
//   const result = filterElementsBySetOfLetters(myArray, setOfLettersToFind);
//   console.log(result); // Wyświetli ['apple']