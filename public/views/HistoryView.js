import {View} from '/views/View.js';

class HistoryView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML =    `<div id="calculator-history" class="calculator-history">
                            </div>`
        this.calculator_history = document.getElementById('calculator-history')
        var history = this.allStorage();

        for(var key in history){
            this.calculator_history.innerHTML += `<div class="history-item"><p class="primary">${key}</p><p class="secondary">${history[key].split(',')[0]}</p><p class="calculator-mode">${history[key].split(',')[1]}</p></div><hr>`
        }

        window.DP.dispatch("VIEW_LOAD")
    }

    allStorage() {

        var values = {},
            keys = Object.keys(localStorage),
            i = keys.length;

        while ( i-- ) {
            values[keys[i]] = localStorage.getItem(keys[i]) ;
        }

        return values;
    }

}

window.customElements.define('history-view', HistoryView);
export{HistoryView};