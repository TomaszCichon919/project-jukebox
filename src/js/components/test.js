import { settings, templates, select, classNames } from '../settings.js';
import utils from '../utils.js';
class Search {
  constructor(element) {
    const thisSearch = this;
    thisSearch.data = {};
    thisSearch.box = [];
    thisSearch.resultCounter = [];
    thisSearch.getData();
    thisSearch.getElements(element);
    thisSearch.initActions();
    //thisSearch.categorieSelect ();
    thisSearch.categoriesContainer = { categories: [] };
  }

  getData() {
    const thisSearch = this;

    const url = settings.db.url + '/' + settings.db.songs;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {

        thisSearch.data.songs = parsedResponse;

        thisSearch.initAllSongData();


      });

  }

  getElements(element) {
    const thisSearch = this;
    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    thisSearch.dom.input = document.querySelector(select.search.input);
    thisSearch.dom.pageTop = document.querySelector(select.search.pagetop);
    thisSearch.dom.categories = document.querySelector(select.search.categorieSearch);
    thisSearch.dom.resultWrapper = document.querySelector(select.containerOf.result);
  }

  initActions() {
    const thisSearch = this;
    thisSearch.dom.pageTop.addEventListener('submit', function (event) {
      event.preventDefault();
      // if (thisSearch.dom.input.value == '') {
      //   for (let songData in thisSearch.data.songs) {
      //     thisSearch.resultCounter++;

      //     const generatedHTML = templates.player(thisSearch.data.songs[songData]);

      //     thisSearch.element = utils.createDOMFromHTML(generatedHTML);

      //     const playerContainer = document.querySelector(select.containerOf.search);

      //     playerContainer.appendChild(thisSearch.element);
      //     thisSearch.dom.GreenAudioPlayer = thisSearch.dom.wrapper.querySelector(select.search.audio);
      //     thisSearch.dom.GreenAudioPlayer.classList.remove(classNames.search.standardPlayer);
      //     thisSearch.dom.GreenAudioPlayer.classList.add(classNames.search.searchPlayer);
      //   }
      //   thisSearch.resultCount = { counter: thisSearch.resultCounter, song: 'songs...' };


      //   const generatedHTML = templates.resultCounter(thisSearch.resultCount);

      //   thisSearch.element = utils.createDOMFromHTML(generatedHTML);

      //   const resultContainer = document.querySelector(select.containerOf.result);

      //   resultContainer.appendChild(thisSearch.element);
      //   thisSearch.initWidget();
      // } else {
      thisSearch.searchFilter(thisSearch.box, thisSearch.dom.input.value);
      // }

    });
  }

  searchFilter(array, searchString) {
    const thisSearch = this;
    const searchTerm = searchString.toLowerCase();
    thisSearch.result = array.filter(item => item.toLowerCase().includes(searchTerm));
    console.log('ddddddd', thisSearch.result);
    thisSearch.generatePlayer();
  }

  generatePlayer() {
    const thisSearch = this;
    thisSearch.dom.wrapper.innerHTML = '';
    thisSearch.dom.resultWrapper.innerHTML = '';
    thisSearch.resultCounter = [];
    thisSearch.resultCount = { counter: 1, song: 'song...' };
    if (thisSearch.result.length == 1) {
      for (let songData in thisSearch.data.songs) {
        if (thisSearch.data.songs[songData].title === thisSearch.result[0] || thisSearch.data.songs[songData].author === thisSearch.result[0]) {

          thisSearch.resultCounter.push(thisSearch.data.songs[songData]);
          const generatedHTML = templates.player(thisSearch.data.songs[songData]);

          thisSearch.element = utils.createDOMFromHTML(generatedHTML);

          const playerContainer = document.querySelector(select.containerOf.search);

          playerContainer.appendChild(thisSearch.element);
        }
      }
      thisSearch.dom.GreenAudioPlayer = thisSearch.dom.wrapper.querySelector(select.search.audio);
      thisSearch.dom.GreenAudioPlayer.classList.remove(classNames.search.standardPlayer);
      thisSearch.dom.GreenAudioPlayer.classList.add(classNames.search.searchPlayer);
      thisSearch.initWidget();

    } else if (thisSearch.result.length > 1) {
      for (let i = 0; i < thisSearch.result.length; i++) {
        for (let songData in thisSearch.data.songs) {
          if (thisSearch.data.songs[songData].title === thisSearch.result[i] || thisSearch.data.songs[songData].author === thisSearch.result[i]) {
            thisSearch.resultCounter.push(thisSearch.data.songs[songData]);


            const generatedHTML = templates.player(thisSearch.data.songs[songData]);

            thisSearch.element = utils.createDOMFromHTML(generatedHTML);

            const playerContainer = document.querySelector(select.containerOf.search);

            playerContainer.appendChild(thisSearch.element);
          }
        }

      }
      thisSearch.dom.GreenAudioPlayers = thisSearch.dom.wrapper.querySelectorAll(select.search.audio);
      for (let song of thisSearch.dom.GreenAudioPlayers) {
        song.classList.remove(classNames.search.standardPlayer);
        song.classList.add(classNames.search.searchPlayer);
      }

      thisSearch.resultCount = { counter: thisSearch.resultCounter.length, song: 'songs...' };
      thisSearch.initWidget();
    } else {
      thisSearch.resultCount = { counter: 'no matching', song: 'songs, we are sorry...' };
    }



    const generatedHTML = templates.resultCounter(thisSearch.resultCount);

    thisSearch.element = utils.createDOMFromHTML(generatedHTML);

    const resultContainer = document.querySelector(select.containerOf.result);

    resultContainer.appendChild(thisSearch.element);
  }


  initWidget() {
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.player2',
      stopOthersOnPlay: true
    });
  }


  initAllSongData() {
    const thisSearch = this;
    thisSearch.dom.categories.addEventListener('change', function (event) {
      thisSearch.selectedValue = event.target.value;
      console.log('checked value', thisSearch.selectedValue);
      thisSearch.box = [];
      if (thisSearch.selectedValue == 'All') {
        for (let songData in thisSearch.data.songs) {
          if (!thisSearch.box.includes(thisSearch.data.songs[songData].title)) {
            thisSearch.box.push(thisSearch.data.songs[songData].title);
          }
          if (!thisSearch.box.includes(thisSearch.data.songs[songData].author)) {
            thisSearch.box.push(thisSearch.data.songs[songData].author);
          }
        }
        console.log('box', thisSearch.box);
      } else {
        for (let songData in thisSearch.data.songs) {
          for (let i = 0; i < thisSearch.data.songs[songData].categories.length; i++) {
            if (thisSearch.data.songs[songData].categories[i] == thisSearch.selectedValue) {
              thisSearch.box.push(thisSearch.data.songs[songData].title);
              thisSearch.box.push(thisSearch.data.songs[songData].author);
            }
          }
        }
        console.log('box', thisSearch.box);
      }

      


    });
  }

}




// initAllSongData () {
//   const thisSearch = this;
//   thisSearch.box = [];
//     for (let songData in thisSearch.data.songs) {
//       if (!thisSearch.box.includes(thisSearch.data.songs[songData].title)){
//         thisSearch.box.push(thisSearch.data.songs[songData].title);
//       }
//       if (!thisSearch.box.includes(thisSearch.data.songs[songData].author)){
//         thisSearch.box.push(thisSearch.data.songs[songData].author);  
//       }
//     }
// console.log('box', thisSearch.box);



export default Search;
+




function countElements(arr) {
  const elementCount = {}; // Initialize an empty object to store element counts

  arr.forEach((element) => {
    if (element in elementCount) {
      elementCount[element]++;
    } else {
      elementCount[element] = 1;
    }
  });

  return elementCount;
}

// Example usage:
const myArray = [1, 2, 3, 2, 4, 1, 5, 3, 2];
const result = countElements(myArray);
console.log(result); // Output: {1: 2, 2: 3, 3: 2, 4: 1, 5: 1}

function getKeyWithBiggestValue(obj) {
  let maxKey = null;
  let maxValue = -Infinity;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value > maxValue) {
        maxValue = value;
        maxKey = key;
      }
    }
  }

  return maxKey;
}

// Example usage:
const myObject = { Fun: 2, Powerful: 3, white: 1 };
const result = getKeyWithBiggestValue(myObject);
console.log(result); // Output: "Powerful"


const playerInstance = greenAudioPlayer.getPlayers('.green-audio-player')[0];

// Add event listener for the play event
playerInstance.on('gap.play', function () {
  console.log('Audio started playing!');
  // Add your custom logic here when the audio starts playing
});



// function findKeyWithMaxValue(obj) {
//   let maxKey = null;
//   let maxValue = -Infinity;
//   let draw = false;

//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       const value = obj[key];
//       if (value > maxValue) {
//         maxValue = value;
//         maxKey = key;
//         draw = false; // Reset draw flag if we find a new maximum value
//       } else if (value === maxValue) {
//         draw = true; // Set draw flag if the current value is the same as the current maximum value
//       }
//     }
//   }

//   return draw ? 'draw' : maxKey;
// }