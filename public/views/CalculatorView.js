import {View} from '/views/View.js';

class CalculatorView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML =    `<custom-calculator></custom-calculator>`


        window.DP.dispatch("VIEW_LOAD")
    }

}

window.customElements.define('calculator-view', CalculatorView);
export{CalculatorView};