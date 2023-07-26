import utils from '../utils.js';
import { templates, select, } from '../settings.js';
class Discover {
  constructor(randomSong) {
    const thisDiscover = this;
    thisDiscover.randomSong = randomSong;
    thisDiscover.randomPlayer();
  }

  randomPlayer() {
    const thisDiscover = this;
    /*generate HTML based on template*/
    const generatedHTML = templates.player(thisDiscover.randomSong);
    //console.log(generatedHTML);
    /* create element using utils.createElementFromHTML */
    thisDiscover.element = utils.createDOMFromHTML(generatedHTML);
    //console.log("thissong element", thisSong.element);
    /* find menu container */
    const playerContainer = document.querySelector(select.containerOf.discover);
    /* add element to menu */
    playerContainer.appendChild(thisDiscover.element);
  }

}

export default Discover;






