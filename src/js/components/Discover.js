import utils from '../utils.js';
import { templates, select, } from '../settings.js';
class Discover {
  constructor(randomSong) {
    const thisDiscover = this;
    thisDiscover.randomSong = randomSong;
    thisDiscover.randomPlayer();
    //thisDiscover.initWidget();
  }

  randomPlayer() {
    const thisDiscover = this;

    const generatedHTML = templates.player(thisDiscover.randomSong);

    thisDiscover.element = utils.createDOMFromHTML(generatedHTML);
   
    const playerContainer = document.querySelector(select.containerOf.discover);

    playerContainer.appendChild(thisDiscover.element);
  }

  // initWidget() {
  //   // eslint-disable-next-line no-undef
  //   GreenAudioPlayer.init({
  //     selector: '.player',
  //     stopOthersOnPlay: true
  //   });
  // }

}

export default Discover;






