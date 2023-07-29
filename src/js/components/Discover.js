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

    const generatedHTML = templates.player(thisDiscover.randomSong);

    thisDiscover.element = utils.createDOMFromHTML(generatedHTML);
   
    const playerContainer = document.querySelector(select.containerOf.discover);

    playerContainer.appendChild(thisDiscover.element);
  }

}

export default Discover;






