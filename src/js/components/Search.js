import {settings, templates, select, classNames} from '../settings.js';
import utils from '../utils.js';
class Search {
  constructor (element){
    const thisSearch = this;
    thisSearch.data = {};
    thisSearch.box = [];
    thisSearch.resultCounter = [];
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
    thisSearch.dom.resultWrapper =document.querySelector(select.containerOf.result); 
   
    
    
    
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
    //console.log("result", thisSearch.result);
    thisSearch.generatePlayer();
  }

  generatePlayer() {
    const thisSearch = this;
    thisSearch.dom.wrapper.innerHTML = '';
    thisSearch.dom.resultWrapper.innerHTML = '';
    thisSearch.resultCounter = [];
    thisSearch.resultCount = {counter: 1, song: 'song...'};
    if (thisSearch.result.length == 1){
      for (let songData in thisSearch.data.songs){
        if(thisSearch.data.songs[songData].title === thisSearch.result[0] || thisSearch.data.songs[songData].author === thisSearch.result[0]) {
          //console.log('selected song', thisSearch.data.songs[songData]);
          thisSearch.resultCounter.push(thisSearch.data.songs[songData]);
          const generatedHTML = templates.player(thisSearch.data.songs[songData]);
        
          thisSearch.element = utils.createDOMFromHTML(generatedHTML);
       
          const playerContainer = document.querySelector(select.containerOf.search);
       
          playerContainer.appendChild(thisSearch.element);
        } 
      }
      //console.log('elelent', thisSearch.dom.GreenAudioPlayer);
      thisSearch.dom.GreenAudioPlayer = thisSearch.dom.wrapper.querySelector(select.search.audio);
      thisSearch.dom.GreenAudioPlayer.classList.remove(classNames.search.standardPlayer);
      thisSearch.dom.GreenAudioPlayer.classList.add(classNames.search.searchPlayer);
      thisSearch.initWidget ();

      console.log('end result', thisSearch.result);
    } else if (thisSearch.result.length > 1){
      for( let i = 0; i < thisSearch.result.length; i++ ){
        for (let songData in thisSearch.data.songs){
          if(thisSearch.data.songs[songData].title === thisSearch.result[i] || thisSearch.data.songs[songData].author === thisSearch.result[i]) {
            //console.log('selected song', thisSearch.data.songs[songData]);
            thisSearch.resultCounter.push(thisSearch.data.songs[songData]);
  
  
            const generatedHTML = templates.player(thisSearch.data.songs[songData]);
         
            thisSearch.element = utils.createDOMFromHTML(generatedHTML);
          
            const playerContainer = document.querySelector(select.containerOf.search);
 
            playerContainer.appendChild(thisSearch.element);
          } 
        }
     
      }
      thisSearch.dom.GreenAudioPlayers = thisSearch.dom.wrapper.querySelectorAll(select.search.audio);
      //console.log('elelent', thisSearch.dom.GreenAudioPlayers);
      for (let song of thisSearch.dom.GreenAudioPlayers){
        song.classList.remove(classNames.search.standardPlayer);
        song.classList.add(classNames.search.searchPlayer);
      }
      console.log('result counter', thisSearch.resultCounter.length);
      
      thisSearch.resultCount = {counter: thisSearch.resultCounter.length, song: 'songs...'};
      thisSearch.initWidget ();
    } else {
      //alert('no result foud');
      thisSearch.resultCount = {counter: 'no matching', song: 'songs, we are sorry...'};
    }


      
      const generatedHTML = templates.resultCounter(thisSearch.resultCount);
    
      thisSearch.element = utils.createDOMFromHTML(generatedHTML);
   
      const resultContainer = document.querySelector(select.containerOf.result);
   
      resultContainer.appendChild(thisSearch.element);
} 


  initWidget () {
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.player2',
      stopOthersOnPlay: true
    });
  }


  initAllSongData () {
    const thisSearch = this;
    //console.log('thisApp.data:', thisApp.data);
    for (let songData in thisSearch.data.songs) {
      if (!thisSearch.box.includes(thisSearch.data.songs[songData].title)){
        thisSearch.box.push(thisSearch.data.songs[songData].title);
      }
      if (!thisSearch.box.includes(thisSearch.data.songs[songData].author)){
        thisSearch.box.push(thisSearch.data.songs[songData].author);  
      }
      console.log('box', thisSearch.box);
    }
  }
}

   
   
    
export default Search;
    