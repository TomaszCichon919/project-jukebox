
import utils from '../utils.js';
import { templates, select,} from '../settings.js';
class Song {
  constructor(id, data) {
    const thisSong = this;
    thisSong.id = id;
    thisSong.data = data;
    thisSong.renderPlayer();
    console.log('thisSongdata', thisSong.data);
  }

  renderPlayer() {
    const thisSong = this;

    const generatedHTML = templates.player(thisSong.data);

    thisSong.element = utils.createDOMFromHTML(generatedHTML);

    const playerContainer = document.querySelector(select.containerOf.home);

    playerContainer.appendChild(thisSong.element);
  }

}

export default Song;