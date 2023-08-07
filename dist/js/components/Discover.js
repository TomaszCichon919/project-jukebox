import utils from '../utils.js';
import { templates, select, classNames} from '../settings.js';
class Discover {
  constructor(randomSong) {
    const thisDiscover = this;
    thisDiscover.randomSong = randomSong;
    thisDiscover.getElements(randomSong);
    thisDiscover.randomPlayer();
   
  }

  getElements(element) {
    const thisDiscover = this;
    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
  }

  randomPlayer() {
    const thisDiscover = this;

    const generatedHTML = templates.player(thisDiscover.randomSong);

    thisDiscover.element = utils.createDOMFromHTML(generatedHTML);
   
    const playerContainer = document.querySelector(select.containerOf.discover);

    playerContainer.appendChild(thisDiscover.element);


    thisDiscover.dom.GreenAudioPlayer = playerContainer.querySelector(select.search.audio);
    thisDiscover.dom.GreenAudioPlayer.classList.remove(classNames.search.standardPlayer);
    thisDiscover.dom.GreenAudioPlayer.classList.add(classNames.search.discoveryPlayer);
    thisDiscover.initWidget();
  }

  initWidget() {
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.player3',
      stopOthersOnPlay: true
    });
  }

}

export default Discover;






