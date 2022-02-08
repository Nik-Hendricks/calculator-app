import {View} from '/views/View.js';

class HistoryView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML =    ``


        window.DP.dispatch("VIEW_LOAD")
    }

}

window.customElements.define('history-view', HistoryView);
export{HistoryView};