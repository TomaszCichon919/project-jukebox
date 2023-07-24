
import utils from '../utils.js';
import { templates, select, classNames } from '../settings.js';
class Song {
    constructor(id, data) {
        const thisSong = this;
        thisSong.id = id;
        thisSong.data = data;
        thisSong.shuffleBin = [];
        thisSong.renderPlayer();
        console.log('thisSongdata', thisSong.data);
    }

    renderPlayer() {
        const thisSong = this;
        /*generate HTML based on template*/
        const generatedHTML = templates.player(thisSong.data);
        //console.log(generatedHTML);
        /* create element using utils.createElementFromHTML */
        thisSong.element = utils.createDOMFromHTML(generatedHTML);
        //console.log("thissong element", thisSong.element);
        /* find menu container */
        const playerContainer = document.querySelector(select.containerOf.home);
        /* add element to menu */
        playerContainer.appendChild(thisSong.element);
    }

}

export default Song;